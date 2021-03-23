import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import data from "./data";
import { productListReducer } from './reducers/products';

const initialState = {};

const reducer = combineReducers({
    productList: productListReducer
})

const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store;