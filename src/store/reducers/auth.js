import * as actionTypes from "../actions/actionTypes";
const initialState = {
    uid: null,
    displayName: null,
    errorMessage: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNIN_SUCCESS:
            return{
                uid: action.uid,
                errorMessage: null
            }
        case actionTypes.SIGNIN_FAILED:
            return{
                errorMessage: action.message
            }
        default:
            return state;
    }
}

export default authReducer;