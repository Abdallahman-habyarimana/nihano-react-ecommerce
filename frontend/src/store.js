import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './reducers/products';
import { cartReducer } from './reducers/cart';
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userTopSellerListReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/users';
import { myOrderReducer, orderDeleteReducer, orderDeliverReducer, orderDetailReducer, orderListReducer, orderPaymentReducer, orderReducer } from './reducers/order';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: ''
    }

};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderReducer,
    orderDetails: orderDetailReducer,
    orderPay: orderPaymentReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    myOrderList: myOrderReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    userTopSellerList: userTopSellerListReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete : productDeleteReducer
})

const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store;