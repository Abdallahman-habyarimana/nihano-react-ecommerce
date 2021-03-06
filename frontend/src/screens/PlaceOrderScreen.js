import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from './../components/CheckoutSteps';
import { createOrder } from './../actions/order';
import { ORDER_CREATE_RESET } from '../constants/order';
import Loading from './../components/Loading';
import Message from './../components/Message';

const PlaceOrderScreen = (props) => {
    const cart = useSelector(state => state.cart)
    const { cartItems, shippingAddress, paymentMethod } = cart;

    const dispatch = useDispatch()

    if(!paymentMethod) {
        props.history.push('/payment')
    }

    const orderCreate = useSelector(state => state.orderCreate )
    const { loading, success, error, order } = orderCreate

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice
    
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
    }

    useEffect(() => {
        if(success) {
            props.history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET})
        }
    },[dispatch, order, props.history, success])
    return ( 
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping Summary</h2>
                                <p>
                                    <strong>Name:</strong> {shippingAddress.fullName} <br/>
                                    <strong>Address:</strong> {shippingAddress.address} <br/>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method:</strong> {paymentMethod} 
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Details</h2>
                                <ul>
                                    {cartItems.map( item  => (
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="small" />
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                        
                                        <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                                        </div>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div> <strong>Total</strong> </div>
                                    <div><strong>${cart.totalPrice}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} className="btn btn__primary btn__block" disabled={cart.cartItems.length === 0}>Place Order</button>
                            </li>
                            { loading && <Loading></Loading> }
                            { error && <Message variant="danger" error={error} />}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PlaceOrderScreen;