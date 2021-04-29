import Axios from 'axios'
import * as actions from '../constants/users'

export const signin = (email, password) => async(dispatch) => {

    dispatch({ type: actions.USER_LOGIN_REQUEST, payload: { email, password} })
    try {
        const { data } = await Axios.post('/api/users/signin', { email, password })
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (err) {
        dispatch({ type: actions.USER_LOGIN_FAIL, payload: err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}
export const register = (name, email, password) => async(dispatch) => {

    dispatch({ type: actions.USER_REGISTER_REQUEST, payload: { name, email, password} })
    try {
        const { data } = await Axios.post('/api/users/register', { name, email, password })
        dispatch({ type: actions.USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (err) {
        dispatch({ type: actions.USER_REGISTER_FAIL, payload: err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');

    dispatch({ type: actions.USER_SIGNOUT })
}

export const detailsUser = (userId) => async(dispatch, getState) => {
    dispatch({ type: actions.USER_DETAILS_REQUEST, payload: userId });
    const { userSignin: { userInfo }} = getState();
    try {
        const { data } = await Axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo?.token}`}
        })
        dispatch({ type: actions.USER_DETAILS_SUCCESS, payload: data})
    } catch (err) {
        dispatch({ type: actions.USER_DETAILS_FAIL, payload: err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}

export const updateUserProfile = (user) => async(dispatch, getState) => {
    dispatch({ type: actions.USER_UPDATE_PROFILE_REQUEST, payload: user});
    const { userSignin: { userInfo }} = getState();

    try {
        const { data } = await Axios.put(`/api/users/profile`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({ type: actions.USER_UPDATE_PROFILE_SUCCESS, payload: data})
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data})
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (err) {
        dispatch({ type: actions.USER_UPDATE_PROFILE_FAIL, payload: err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}

export const listUsers = () => async(dispatch, getState) => {
    dispatch({ type: actions.USER_LIST_REQUEST });
    const { userSignin: { userInfo }} = getState();
    try {
        const { data } = await Axios.get(`/api/users`, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({ type: actions.USER_LIST_SUCCESS, payload: data })
        
    } catch (err) {
        dispatch({ type: actions.USER_LIST_FAIL, payload: err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}

export const updateUser = (user) => async(dispatch, getState) => {
    dispatch({ type: actions.USER_UPDATE_REQUEST, payload: user })
    const { userSignin:{userInfo}} = getState();
    try {
        const { data } = await Axios.put(`/api/users/${user._id}`, user,
        {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({
            type: actions.USER_UPDATE_SUCCESS, payload: data
        })
    } catch (err) {
        dispatch({ type: actions.USER_UPDATE_FAIL, payload:err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}

export const deleteUser = (id) => async(dispatch, getState) => {
    dispatch({ type: actions.USER_DELETE_REQUEST, payload: id})
    const { userSignin:{userInfo}} = getState();
    try {
        const { data } = await Axios.delete(`/api/users/${id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({
            type: actions.USER_DELETE_SUCCESS
        })
    } catch (err) {
        dispatch({ type: actions.USER_DELETE_FAIL, payload:err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}

export const listTopSellers = () => async(dispatch, getState) => {
    dispatch({ type: actions.USER_TOP_SELLER_REQUEST });
    try {
        const { data } = await Axios.get(`/api/users/top-sellers`)
        dispatch({ type: actions.USER_TOP_SELLER_SUCCESS, payload: data })
        
    } catch (err) {
        dispatch({ type: actions.USER_TOP_SELLER_FAIL, payload: err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}