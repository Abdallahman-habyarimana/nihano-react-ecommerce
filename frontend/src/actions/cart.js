import axios from 'axios'
import { ADD_ITEM_CART, CART_REMOVE_ITEM } from './../constants/cart';

export const addToCart = (productId, qty) => async(dispatch, getState) => {

    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({
        type: ADD_ITEM_CART,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}