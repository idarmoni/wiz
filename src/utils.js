import { store } from "./store";
import { TabPanel } from "./TabsManager";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

  export function savercp(rcpid,rcp,rcpName) {
    // alert('saving the file ' + rcpid);

    // var state = store.getState()
    if(rcpName){
    rcp.recipeName = rcpName
    }
    rcp={recipeName:rcp.recipeName,nodeDataArray:rcp.nodeDataArray,linkDataArray:rcp.linkDataArray}
    // console.log(rcp.recipeName)
    var temp = JSON.stringify(rcp,null,'\t')

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: rcpid, rcp: temp})
    };
    fetch('http://localhost:3001/files', requestOptions)
      .then(response => response.json());
  }  

  
export function saveall()
{
  var recipeMap = store.getState().recipeMap
  for(const index in recipeMap)
  {
    savercp(index,recipeMap[index].rcp,recipeMap[index].rcpName)
  }
}

export function save()
{
  var recipeMap = store.getState().recipeMap
  var index = store.getState().currentIndex
  savercp(index,recipeMap[index].rcp,recipeMap[index].rcpName)
}

export const addNewTab = function () {
  const enteredName = prompt('Please enter your recipe name')
  const uuidV4 = uuidv4()
  addTab(uuidV4,enteredName)
};

export const addTab = function (tabid,fileName) {
  var _instance = store.getState().instance
  if(!_instance) return
  // open tab
  _instance.open({id: tabid, title: fileName, panelComponent: (props) => <TabPanel  index={tabid} rcpName={fileName}/>}).then(() => {
    console.log('tab '+tabid+' is open');
  });
  // switch to tab
  _instance.select(tabid).then(() => {
    console.log('tab '+tabid+' is selected');
  });

  changRCPName(fileName,tabid)
  
};

export function serverTest(){
  axios(
    `http://localhost:3001/test/abe569df-f696-4956-8200-4313b0675e5b`,
  ).then(response => {
    //setData(response.data)
  })
    .catch(error => {
      console.error("error fetching data: ", error);
    })
}

export function changRCPName(fileName,tabid){
store.dispatch({
  type:'change recipe name',
  rcpName:fileName,
  index:tabid})
}