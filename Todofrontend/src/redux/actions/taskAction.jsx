import { GET_ALL_TASKS, GET_ERROR, CHENGE_STATUS_TASK, REMOVE_TASK, CREATE_TASK, UPDATE_TASK } from '../type'

import { useGetDataToken } from '../../Hooks/useGetData'
import { useUpdateData } from '../../Hooks/useUpdateData';
import { useDeleteDataToken } from '../../Hooks/useDeleteData';
import { useInsertData, useInsertDataForTask } from '../../Hooks/useInsertData';


//get Tasks User
export const getTasks = (data) => async (dispatch) => {
    try {

        const response = await useGetDataToken(`/api/v1/list`);
        dispatch({
            type: GET_ALL_TASKS,
            payload: response,

            loading: true

        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: e.response,
            loading: false
        })
    }
}



// update status task 
// id =  task
export const editStatus = (id) => async (dispatch) => {

    try {

        const response = await useUpdateData(`/api/v1/list/${id}/done`)
        dispatch({

            type: CHENGE_STATUS_TASK,
            payload: response,
            loading: true
        })
        console.log(`update status of ${id}`)
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: e.response,
            loading: false
        })
    }
}

// deklete  task 
// id =  task
export const deleteTask = (id) => async (dispatch) => {

    try {
        const response = await useDeleteDataToken(`/api/v1/list/${id}`)

        dispatch({

            type: REMOVE_TASK,
            payload: response,
            loading: true
        })
        console.log(`remove status of ${id}`)
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: e.response,
            loading: false
        })
    }
}


// Create  task 

export const createNewTaks = (data) => async (dispatch) => {
    try {

        const response = await useInsertDataForTask(`/api/v1/list`, data);


        dispatch({
            type: CREATE_TASK,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: e.response,
            loading: false
        })
    }
}



// update  task 
// id =  task
export const updateTaskRedux = (id, data) => async (dispatch) => {

    try {
        console.log(id)
        const response = await useUpdateData(`/api/v1/list/${id}`, data)
        dispatch({

            type: UPDATE_TASK,
            payload: response,
            loading: true
        })
        console.log(`update status of ${id}`)
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: e.response,
            loading: false
        })
    }
}
