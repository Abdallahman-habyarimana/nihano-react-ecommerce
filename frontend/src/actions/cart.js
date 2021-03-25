import axios from 'axios'
import { ADD_ITEM_CART } from './../constants/cart';

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