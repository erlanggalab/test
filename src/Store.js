import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import CategoryReducer from './Reducers/Category'
import RecipeReducer from './Reducers/Recipe'
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}
const persistedState = loadState()

const store = createStore(
  combineReducers({
    category: CategoryReducer,
    recipe: RecipeReducer
  }),
  persistedState,
  applyMiddleware(thunk)
)
export default store
