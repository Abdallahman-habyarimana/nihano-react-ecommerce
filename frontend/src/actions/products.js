import axios from 'axios'
import * as actions from '../constants/products';

export const listProducts = () => async(dispatch) => {
    dispatch({
        type: actions.PRODUCT_LIST_REQUEST
    });

    try {
        const { data } = await axios.get('/api/products');
        dispatch({ type: actions.PRODUCT_LIST_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: actions.PRODUCT_LIST_FAIL, payload: err.message })
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