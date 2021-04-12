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
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({ type: actions.USER_DETAILS_SUCCESS, payload: data})
    } catch (err) {
        dispatch({ type: actions.USER_DETAILS_FAIL, payload: err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}