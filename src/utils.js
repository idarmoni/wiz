import { store } from "./store";

  export function savercp(recipeName,rcp) {
    alert('saving the file ' + recipeName);
    var temp = JSON.parse(rcp)
    temp = {nodeDataArray: temp.nodeDataArray , linkDataArray:temp.linkDataArray} 
    temp = JSON.stringify(temp,null,'\t')
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: recipeName, rcp: temp})
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
  var temp= store.getState()
  var recipeMap = store.getState().recipeMap
  var index = store.getState().currentIndex
  savercp(recipeMap[index].rcpName,recipeMap[index].rcp)
}