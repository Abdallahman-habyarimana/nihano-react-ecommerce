import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_RESET, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USER_DETAILS_RESET, USER_TOP_SELLER_REQUEST, USER_TOP_SELLER_SUCCESS, USER_TOP_SELLER_FAIL, USER_TOP_SELLER_RESET, USER_ADDRESS_MAP_CONFIRM } from './../constants/users';

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

export const userDetailsReducer = (state ={loading: true}, action) => {
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return { loading: true};
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload}
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload}
        case USER_DETAILS_RESET:
            return {}
        default:
            return state;
    }
}

export const userUpdateProfileReducer = (state ={}, action) => {
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true}
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload}
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state;
    }
}

export const userListReducer = (state ={loading: true}, action) => {
    switch(action.type){
        case USER_LIST_REQUEST:
            return { loading: true}
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload}
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload}
        case USER_LIST_RESET:
            return {}
        default:
            return state;
    }
}

export const userDeleteReducer = (state ={}, action) => {
    switch(action.type){
        case USER_DELETE_REQUEST:
            return { loading: true}
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true}
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload}
        case USER_DELETE_RESET:
            return {}
        default:
            return state;
    }
}

export const userUpdateReducer = (state ={}, action) => {
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return { loading: true}
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true}
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload}
        case USER_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}

export const userTopSellerListReducer = (state ={loading: true}, action) => {
    switch(action.type){
        case USER_TOP_SELLER_REQUEST:
            return { loading: true}
        case USER_TOP_SELLER_SUCCESS:
            return { loading: false, users: action.payload}
        case USER_TOP_SELLER_FAIL:
            return { loading: false, error: action.payload}
        case USER_TOP_SELLER_RESET:
            return {}
        default:
            return state;
    }
}

export const userAddressMapReducer = (state ={}, action) => {
    switch(action.type){
        case USER_ADDRESS_MAP_CONFIRM:
            return { address: action.payload}
        default:
            return state;
    }
}
