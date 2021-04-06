import axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS } from "../constants/order"
import { CART_EMPTY } from './../constants/cart';

export const createOrder = (order) => async(dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })

    try {
        const { userSignin: { userInfo}} = getState();
        const { data } = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY })
        localStorage.removeItem("cartItems");
    } catch (err) {
        dispatch({ type: ORDER_CREATE_FAIL,
        payload: err.response && err.response.data.message ? err.response.data.message : err.message })
    }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAIL_REQUEST, payload: orderId });
    const {userSignin: { userInfo }} = getState();
    try {
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data})
    } catch (err) {
        const message = err.response.data.message && err.message ? err.response.data.message : err.message
        dispatch({ type: ORDER_DETAIL_FAIL, payload: message})
    }
}