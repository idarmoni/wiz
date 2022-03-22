import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import React from 'react';
import { store } from './store';

export default function RichObjectTreeView(props) {



  const handleSelect = (event, nodeId) => {
    store.dispatch({
      type: 'change tree select',
      id: nodeId
    })
    // console.log(nodeId);

  };

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
    id='yess'
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ flexGrow: 1, maxWidth: 400 }}
      
      selected={store.getState().treeSelected}
      
      onNodeSelect={handleSelect}
    >
      {renderTree(props.dataTree)}
    </TreeView>
  );

}