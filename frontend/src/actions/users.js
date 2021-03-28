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

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({ type: actions.USER_SIGNOUT })
}