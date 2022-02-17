import { createStore } from 'redux';


// Define an initial state value for the app
const initialState = {recipeMap:{},currentIndex:0}
  

// Create a "reducer" function that determines what the new state
// should be when something happens in the app
function counterReducer(state = initialState, action) {
    // Reducers usually look at the type of action that happened
    // to decide how to update the state
    switch (action.type) {
      case 'change recipe':
        return { ...state, value: state.recipeMap[action.index] = {rcp:action.rcp,rcpName:action.rcpName }}
        case 'change tab':
            return{...state,currentIndex : action.index}


      default:
        // If the reducer doesn't care about this action type,
        // return the existing state unchanged
        return state
    }
  }

export var store = createStore(counterReducer);
