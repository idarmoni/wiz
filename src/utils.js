import { store } from "./store";
import { TabPanel } from "./TabsManager";
import { v4 as uuidv4 } from 'uuid';


  function savercp(rcpid,rcp,rcpName) {
    // alert('saving the file ' + rcpid);

    if(rcpName){
    rcp.recipeName = rcpName
    }

    rcp.nodeDataArray = rcp.nodeDataArray.filter(x=>x.category)
    rcp.nodeDataArray.forEach(element => {
      element.loc=undefined
      element.guests=undefined
    });

    rcp={recipeName:rcp.recipeName,nodeDataArray:rcp.nodeDataArray,linkDataArray:rcp.linkDataArray}
    // console.log(rcp.recipeName)
    var temp = JSON.stringify(rcp,null,'\t')

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: rcpid, rcp: temp})
    };
    fetch('http://localhost:3001/recipes', requestOptions)
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
  if(!enteredName)return;
  const uuidV4 = uuidv4()
  addTab(uuidV4,enteredName)
};

export const addTab = function (tabid,fileName) {
  var _instance = store.getState().instance
  if(!_instance) return
  // open tab
  _instance.open({id: tabid, title: fileName, panelComponent: (props) => <TabPanel  index={tabid} tabName={fileName}/>}).then(() => {
    console.log('tab '+tabid+' is open');
  });
  // switch to tab
  _instance.select(tabid).then(() => {
    console.log('tab '+tabid+' is selected');
  });

  changRCPName(fileName,tabid)
  
};

export const changtabName = function (tabid) {

        
  const enteredName = prompt('Please enter new name for the recipe')
  if(!enteredName)return;
  //changRCPName(enteredName,data[index].id)
  addTab(tabid,enteredName)
  document.getElementById(tabid+'_button').textContent=enteredName
  var _instance = store.getState().instance
  _instance.setTab(tabid, {title: enteredName})
  _instance.refresh()
}


export function execute(){
  var state = store.getState()
  var id = state.currentIndex
  var topost = {
    recipeid: id.split(' ')[0],
    fbfName:'YRE45.fbf',
    matchs:state.recipeMap[state.currentIndex].matchs}
var t=state.recipeMap[state.currentIndex]
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(topost)
  };
  fetch(`http://localhost:3001/execute`, requestOptions)
    // .then(response => response.json());
}

export function changRCPName(fileName,tabid){
store.dispatch({
  type:'change recipe name',
  rcpName:fileName,
  index:tabid})
}