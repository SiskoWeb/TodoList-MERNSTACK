import { GET_TOEKN, GET_ERROR_AUTH } from '../type'
import axios from 'axios'

import { useInsertData } from '../../Hooks/useInsertData'
import baseUrl from '../../Api/baseURL'









//create new user 
export const createNewUser = (data) => async (dispatch) => {
    try {
        console.log(data)
        const response = await useInsertData(`/api/v1/auth/signup`, data);
        dispatch({
            type: GET_TOEKN,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_TOEKN,
            payload: e.response,
        })
    }
}

//login user 
export const loginUser = (data) => async (dispatch) => {

    try {

        const response = await useInsertData(`/api/v1/auth/login`, data)
        dispatch({
            type: GET_TOEKN,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_TOEKN,
            payload: e.response,
        })


    }
}