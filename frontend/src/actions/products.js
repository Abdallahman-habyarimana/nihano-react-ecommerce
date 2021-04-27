import axios from 'axios'
import * as actions from '../constants/products';

export const listProducts = ({ 
    seller='', 
    name='', 
    category='', 
    order = '',
    min=0, 
    max=0, 
    rating=0 }) => async(dispatch) => {
    dispatch({
        type: actions.PRODUCT_LIST_REQUEST
    });

    try {
        const { data } = await axios.get(`/api/products?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`);
        dispatch({ type: actions.PRODUCT_LIST_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: actions.PRODUCT_LIST_FAIL, payload: err.message })
    }

}

export const listProductCategories = () => async(dispatch) => {
    dispatch({
        type: actions.PRODUCT_CATEGORIES_REQUEST
    });

    try {
        const { data } = await axios.get(`/api/products/categories`);
        console.log(data)
        dispatch({ type: actions.PRODUCT_CATEGORIES_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: actions.PRODUCT_CATEGORIES_FAIL, payload: err.message })
    }

}

export const detailsProduct = (productId) => async(dispatch) => {
    dispatch({
        type: actions.PRODUCT_DETAILS_REQUEST,
        payload: productId
    });

    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({ type: actions.PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: actions.PRODUCT_DETAILS_FAIL, payload: err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}

export const createProduct = () => async(dispatch, getState) => {
    dispatch({ type: actions.PRODUCT_CREATE_REQUEST })
    const { userSignin:{userInfo}} = getState();
    try {
        const { data } = await axios.post('/api/products', {}, 
        {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({
            type: actions.PRODUCT_CREATE_SUCCESS, payload: data.product
        })
    } catch (err) {
        dispatch({ type: actions.PRODUCT_CREATE_FAIL, payload:err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}

export const updateProduct = (product) => async(dispatch, getState) => {
    dispatch({ type: actions.PRODUCT_UPDATE_REQUEST, payload: product })
    const { userSignin:{userInfo}} = getState();
    try {
        const { data } = await axios.put(`/api/products/${product._id}`, product,
        {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({
            type: actions.PRODUCT_UPDATE_SUCCESS, payload: data
        })
    } catch (err) {
        dispatch({ type: actions.PRODUCT_UPDATE_FAIL, payload:err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}

export const deleteProduct = (id) => async(dispatch, getState) => {
    dispatch({ type: actions.PRODUCT_DELETE_REQUEST, payload: id})
    const { userSignin:{userInfo}} = getState();
    try {
        const { data } = await axios.delete(`/api/products/${id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({
            type: actions.PRODUCT_DELETE_SUCCESS
        })
    } catch (err) {
        dispatch({ type: actions.PRODUCT_DELETE_FAIL, payload:err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}

export const createReview = (productId, review) => async(dispatch, getState) => {
    dispatch({ type: actions.PRODUCT_REVIEW_CREATE_REQUEST })
    const { userSignin:{userInfo}} = getState();
    try {
        const { data } = await axios.post(`/api/products/${productId}/reviews`, review,
        {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({
            type: actions.PRODUCT_REVIEW_CREATE_SUCCESS, payload: data.review
        })
    } catch (err) {
        dispatch({ type: actions.PRODUCT_REVIEW_CREATE_FAIL, payload:err.response.data.message && err.message ? err.response.data.message : err.message })
    }
}
