import { GET_ALL_TASKS, GET_ERROR, CHENGE_STATUS_TASK, REMOVE_TASK, CREATE_TASK, UPDATE_TASK } from '../type'

const inital = {
    taskList: [],
    loading: true
}
const tasksReducer = (state = inital, action) => {

    switch (action.type) {
        case GET_ALL_TASKS:
            return {
                ...state,
                taskList: action.payload,
                loading: false
            }
        case CHENGE_STATUS_TASK:
            return {
                ...state,
                taskList: action.payload,
                loading: false
            }
        case REMOVE_TASK:
            return {
                ...state,
                taskList: action.payload,
                loading: false
            }
        case CREATE_TASK:
            return {
                ...state,
                taskList: action.payload,
                loading: false
            }
        case UPDATE_TASK:
            return {
                ...state,
                taskList: action.payload,
                loading: false
            }

        case GET_ERROR:
            return {
                ...state,
                taskList: action.payload,
                loading: true
            }
        default:
            return state;
    }
}

export default tasksReducer