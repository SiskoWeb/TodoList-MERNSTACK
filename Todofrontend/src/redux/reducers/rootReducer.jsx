import { combineReducers } from 'redux'
import tasksReducer from './taskReducer'
import authReducer from './authReducer'

export default combineReducers({
    tasks: tasksReducer,
    auth: authReducer
})


