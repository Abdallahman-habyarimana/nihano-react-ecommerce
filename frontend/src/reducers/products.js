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

export const productDetailsReducer = (state = { loading: true}, action) => {
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

export const productCreateReducer = (state={}, action) => {
    switch(action.type){
        case actions.PRODUCT_CREATE_REQUEST: 
            return { loading: true}
        case actions.PRODUCT_CREATE_SUCCESS :
            return { loading: false, success: true, product: action.payload };
        case actions.PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload}
        case actions.PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}
export const productUpdateReducer = (state={}, action) => {
    switch(action.type){
        case actions.PRODUCT_UPDATE_REQUEST: 
            return { loading: true}
        case actions.PRODUCT_UPDATE_SUCCESS :
            return { loading: false, success: true, product: action.payload };
        case actions.PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload}
        case actions.PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const productDeleteReducer = (state={}, action) => {
    switch(action.type){
        case actions.PRODUCT_DELETE_REQUEST: 
            return { loading: true}
        case actions.PRODUCT_DELETE_SUCCESS :
            return { loading: false, success: true };
        case actions.PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload}
        case actions.PRODUCT_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const productCategoriesReducer = (state = { products: []}, action ) => {
    const { type, payload } = action
    switch(type) {
        case actions.PRODUCT_CATEGORIES_REQUEST:
            return { loading: true}
        case actions.PRODUCT_CATEGORIES_SUCCESS: 
            return { loading: false, categories: payload }
        case actions.PRODUCT_CATEGORIES_FAIL:
            return { loading: false, error: payload }
        default:
            return state;
    }
}