import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
const initailstate = {}

const middleware = [thunk]

const store = createStore(rootReducer, initailstate, composeWithDevTools(applyMiddleware(...middleware)))

export default store