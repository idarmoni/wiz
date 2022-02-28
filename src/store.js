import { createStore } from 'redux';


// Define an initial state value for the app
const initialState = { recipeMap: {}, currentIndex: 0 }


// Create a "reducer" function that determines what the new state
// should be when something happens in the app
function counterReducer(state = initialState, action) {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {
    case 'change recipe':
      var temp = JSON.parse(action.rcp)
      // temp = {nodeDataArray: temp.nodeDataArray, linkDataArray: temp.linkDataArray }
      if(!state.recipeMap[action.index])
      {
        state.recipeMap[action.index]={}
      }
      return {
        ...state, value: state.recipeMap[action.index].rcp = temp
      }
    case 'change recipe name':
      // temp = JSON.parse(action.rcp)
      // temp.recipeName = action.rcpName
      if(!state.recipeMap[action.index])
      {
        state.recipeMap[action.index]={}
      }
      return {
        ...state, value: state.recipeMap[action.index].rcpName = action.rcpName
      }
    case 'change tab':
      return { ...state, currentIndex: action.index }
    case 'create instance':
      return { ...state, instance: action.instance }


    default:
      // If the reducer doesn't care about this action type,
      // return the existing state unchanged
      return state
  }
}

export var store = createStore(counterReducer);
