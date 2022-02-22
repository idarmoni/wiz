import { store } from "./store";
import { TabPanel } from "./TabsManager";
import { v4 as uuidv4 } from 'uuid';


  export function savercp(rcpid,rcp) {
    // alert('saving the file ' + rcpid);
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
    savercp(recipeMap[index].rcpName,recipeMap[index].rcp)
  }
}

export function save()
{
  var recipeMap = store.getState().recipeMap
  var index = store.getState().currentIndex
  savercp(recipeMap[index].rcpName,recipeMap[index].rcp)
}


var maxtabid=0

export const addNewTab = function () {
  maxtabid+=1

  const uuidV4 = uuidv4()
  addTab(uuidV4,'new recipe '+maxtabid)
};

export const addTab = function (tabid,fileName) {
  // alert('open '+ tabid +' '+fileName)
  var _instance = store.getState().instance
  if(!_instance) return
  // open tab
  _instance.open({id: tabid, title: fileName, panelComponent: (props) => <TabPanel  index={tabid}/>}).then(() => {
    console.log('tab '+tabid+' is open');
  });
  // switch to tab
  _instance.select(tabid).then(() => {
    console.log('tab '+tabid+' is selected');
  });
};