import { GET_TOEKN, REMOVE_TOKEN } from '../type'


const inital = {
    createUser: [],
    loading: true
}
const authReducer = (state = inital, action) => {
    switch (action.type) {

        case GET_TOEKN:
            return {
                ...state,
                createUser: action.payload,
                loading: false
            }
        case REMOVE_TOKEN:
            return {
                ...state,
                createUser: '',
                loading: false
            }

        default:
            return state
    }

}

export default authReducer