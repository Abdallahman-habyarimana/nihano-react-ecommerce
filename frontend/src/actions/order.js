import axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL } from "../constants/order"
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

export const payOrder = (order, paymentResult) => async(dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult }});

    const { userSignin: { userInfo }} = getState();
    try {
        const { data } = axios.put(`/api/orders/${order.id}/pay`, paymentResult, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (err) {
        const message = err.response.data.message && err.message ? err.response.data.message : err.message
        dispatch({ type: ORDER_PAY_FAIL, payload: message})
    }
} 

export const listOrderMine = () => async(dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST });
    const { userSignin: {userInfo}} = getState();
    try {
        const { data } = await axios.get('/api/orders/me', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        })
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data})
    } catch (err) {
        const message = err.response.data.message && err.message ? err.response.data.message : err.message
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message})
    }
}

export const listOrders = ({ seller = ''}) => async(dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userSignin: {userInfo}} = getState();
    try {
        const { data } = await axios.get(`/api/orders?seller=${seller}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        })
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data})
    } catch (err) {
        const message = err.response.data.message && err.message ? err.response.data.message : err.message
        dispatch({ type: ORDER_LIST_FAIL, payload: message})
    }
}

export const deleteOrders = (orderId) => async(dispatch, getState) => {
    dispatch({ type: ORDER_DELETE_REQUEST });
    const { userSignin: {userInfo}} = getState();
    try {
        const { data } = await axios.delete(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        })
        dispatch({ type: ORDER_DELETE_SUCCESS, payload: data})
    } catch (err) {
        const message = err.response.data.message && err.message ? err.response.data.message : err.message
        dispatch({ type: ORDER_DELETE_FAIL, payload: message})
    }
}

export const deliverOrder = (orderId) => async(dispatch, getState) => {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    const { userSignin: { userInfo }} = getState();
    try {
        const { data } = axios.put(`/api/orders/${orderId}/deliver`, {}, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data })
    } catch (err) {
        const message = err.response.data.message && err.message ? err.response.data.message : err.message
        dispatch({ type: ORDER_DELIVER_FAIL, payload: message})
    }
} 