import * as actions from '../constants/products'

export const productListReducer = (state = { products: []}, action ) => {
    const { type, payload } = action
    switch(type) {
        case actions.PRODUCT_LIST_REQUEST:
            return { loading: true}
        case actions.PRODUCT_LIST_SUCCESS: 
            return { loading: false, products: payload }
        case actions.PRODUCT_LIST_FAIL:
            return { loading: false, error: payload }
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product: {}, loading: true}, action) => {
    const { type, payload } = action
    switch(type) {
        case actions.PRODUCT_DETAILS_REQUEST:
            return { loading: true}
        case actions.PRODUCT_DETAILS_SUCCESS: 
            return { loading: false, product: payload }
        case actions.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: payload }
        default:
            return state;
    }
}