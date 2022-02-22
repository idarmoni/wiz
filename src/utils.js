import { store } from "./store";
// import { TabPanel } from "./BasicTabs";

  export function savercp(rcpid,rcp) {
    alert('saving the file ' + rcpid);
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
  var t = store.getState()
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