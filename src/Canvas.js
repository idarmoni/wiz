import * as go from 'gojs';
import { produce } from 'immer';
import * as React from 'react';
import { DiagramWrapper } from './DiagramWrapper';

import './App.css';
//import internal from 'stream';
/**
 * Use a linkDataArray since we'll be using a GraphLinksModel,
 * and modelData for demonstration purposes. Note, though, that
 * both are optional props in ReactDiagram.
 */


class Canvas extends React.Component {
  // Maps to store key -> arr index for quick lookups
  constructor(props) {
    super(props);


    this.state = {
      nodeCategoryProperty: "type",
      selectedData: null,
      skipsDiagramUpdate: false,
      model: this.props.recipe
    };
    // init maps
    this.mapNodeKeyIdx = new Map();
    this.mapLinkKeyIdx = new Map();
    // bind handler methods
    this.handleDiagramEvent = this.handleDiagramEvent.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRelinkChange = this.handleRelinkChange.bind(this);

    
  }


  /**
   * Handle any relevant DiagramEvents, in this case just selection changes.
   * On ChangedSelection, find the corresponding data and set the selectedData state.
   * @param e a GoJS DiagramEvent
   */
  handleDiagramEvent(e) {
    const name = e.name;
    switch (name) {
      case 'ChangedSelection': {
        const sel = e.subject.first();
        this.setState(
          produce((draft) => {
            if (sel) {
              if (sel instanceof go.Node) {
                const idx = this.mapNodeKeyIdx.get(sel.key);
                if (idx !== undefined && idx >= 0) {
                  const nd = draft.model.nodeDataArray[idx];
                  draft.selectedData = nd;
                }
              } else if (sel instanceof go.Link) {
                const idx = this.mapLinkKeyIdx.get(sel.key);
                if (idx !== undefined && idx >= 0) {
                  const ld = draft.model.linkDataArray[idx];
                  draft.selectedData = ld;
                }
              }
            } else {
              draft.selectedData = null;
            }
          })
        );
        break;
      }
      default: break;
    }
  }

  /**
   * Handle GoJS model changes, which output an object of data changes via Model.toIncrementalData.
   * This method iterates over those changes and updates state to keep in sync with the GoJS model.
   * @param obj a JSON-formatted string
   */
  handleModelChange(obj) {
    const insertedNodeKeys = obj.insertedNodeKeys;
    const modifiedNodeData = obj.modifiedNodeData;
    const removedNodeKeys = obj.removedNodeKeys;
    const insertedLinkKeys = obj.insertedLinkKeys;
    const modifiedLinkData = obj.modifiedLinkData;
    const removedLinkKeys = obj.removedLinkKeys;
    const modifiedModelData = obj.modelData;

    // maintain maps of modified data so insertions don't need slow lookups
    const modifiedNodeMap = new Map();
    const modifiedLinkMap = new Map();
    this.setState(
      produce((draft) => {
        let narr = draft.model.nodeDataArray;
        if (modifiedNodeData) {
          modifiedNodeData.forEach((nd) => {
            modifiedNodeMap.set(nd.key, nd);
            const idx = this.mapNodeKeyIdx.get(nd.key);
            if (idx !== undefined && idx >= 0) {
              narr[idx] = nd;
              if (draft.selectedData && draft.selectedData.key === nd.key) {
                draft.selectedData = nd;
              }
            }
          });
        }
        if (insertedNodeKeys) {
          insertedNodeKeys.forEach((key) => {
            const nd = modifiedNodeMap.get(key);
            const idx = this.mapNodeKeyIdx.get(key);
            if (nd && idx === undefined) {  // nodes won't be added if they already exist
              this.mapNodeKeyIdx.set(nd.key, narr.length);
              narr.push(nd);
            }
          });
        }
        if (removedNodeKeys) {
          narr = narr.filter((nd) => {
            if (removedNodeKeys.includes(nd.key)) {
              return false;
            }
            return true;
          });
          draft.model.nodeDataArray = narr;
        }

        let larr = draft.model.linkDataArray;
        if (modifiedLinkData) {
          modifiedLinkData.forEach((ld) => {
            modifiedLinkMap.set(ld.key, ld);
            const idx = this.mapLinkKeyIdx.get(ld.key);
            if (idx !== undefined && idx >= 0) {
              larr[idx] = ld;
              if (draft.selectedData && draft.selectedData.key === ld.key) {
                draft.selectedData = ld;
              }
            }
          });
        }
        if (insertedLinkKeys) {
          insertedLinkKeys.forEach((key) => {
            const ld = modifiedLinkMap.get(key);
            const idx = this.mapLinkKeyIdx.get(key);
            if (ld && idx === undefined) {  // links won't be added if they already exist
              this.mapLinkKeyIdx.set(ld.key, larr.length);
              larr.push(ld);
            }
          });
        }
        if (removedLinkKeys) {
          larr = larr.filter((ld) => {
            if (removedLinkKeys.includes(ld.key)) {
              return false;
            }
            return true;
          });
          draft.model.linkDataArray = larr;
        }
        // handle model data changes, for now just replacing with the supplied object
        if (modifiedModelData) {
          draft.model.modelData = modifiedModelData;
        }
        draft.skipsDiagramUpdate = true;  // the GoJS model already knows about these updates
      })
    );
  }

  /**
   * Handle inspector changes, and on input field blurs, update node/link data state.
   * @param path the path to the property being modified
   * @param value the new value of that property
   * @param isBlur whether the input event was a blur, indicating the edit is complete
   */
  handleInputChange(path, value, isBlur) {
    this.setState(
      produce((draft) => {
        const data = draft.selectedData;  // only reached if selectedData isn't null
        data[path] = value;
        if (isBlur) {
          const key = data.key;
          if (key < 0) {  // negative keys are links
            const idx = this.mapLinkKeyIdx.get(key);
            if (idx !== undefined && idx >= 0) {
              draft.model.linkDataArray[idx] = data;
              draft.skipsDiagramUpdate = false;
            }
          } else {
            const idx = this.mapNodeKeyIdx.get(key);
            if (idx !== undefined && idx >= 0) {
              draft.model.nodeDataArray[idx] = data;
              draft.skipsDiagramUpdate = false;
            }
          }
        }
      })
    );
  }

  /**
   * Handle changes to the checkbox on whether to allow relinking.
   * @param e a change event from the checkbox
   */
  handleRelinkChange(e) {/*
    const target = e.target;
    const value = target.checked;
    this.setState({ modelData: { canRelink: value }, skipsDiagramUpdate: false });*/
  }

  render() {
    // const selectedData = this.state.selectedData;
    var diagramprops = {
      rcpid: this.props.rcpid,
      tabName: this.props.tabName,
      index: this.props.index,
      matchs: this.props.matchs,
      model: this.state.model,
      skipsDiagramUpdate: this.state.skipsDiagramUpdate,
      onDiagramEvent: this.handleDiagramEvent,
      onModelChange: this.handleModelChange
    }
    return (
      DiagramWrapper(diagramprops))


  }
}

export default Canvas;
