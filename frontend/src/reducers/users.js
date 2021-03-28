import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_SIGNOUT } from './../constants/users';

export const userSigninReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true}
        case USER_LOGIN_SUCCESS:
            return { loading: false, useInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_SIGNOUT:
            return {}
        default:
            return state;
    }
}