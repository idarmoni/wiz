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

      if(!state.recipeMap[state.currentIndex])
      {
        state.recipeMap[state.currentIndex]={}
      }
      return {
        ...state, value: state.recipeMap[state.currentIndex].rcp = temp
      }
    case 'change recipe name':
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
    case 'change tree select':
      return {...state, treeSelected:action.id}
    case 'add match':
      if(!state.recipeMap[state.currentIndex].matchs){
        state.recipeMap[state.currentIndex].matchs=[]
      }

      state.recipeMap[state.currentIndex].matchs.push(
        { index: parseInt(action.index), inputKey: action.inputkey, fieldname:action.fieldname })
      return state
    case 'filter match':
      if(!state.recipeMap[state.currentIndex].matchs){
        state.recipeMap[state.currentIndex].matchs=[]
      }
      state.recipeMap[state.currentIndex].matchs=state.recipeMap[state.currentIndex].matchs.filter(action.predicate)
      return state

    default:
      // If the reducer doesn't care about this action type,
      // return the existing state unchanged
      return state
  }
}

export var store = createStore(counterReducer);
