import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from './../constants/users';

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
export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true}
        case USER_REGISTER_SUCCESS:
            return { loading: false, useInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}