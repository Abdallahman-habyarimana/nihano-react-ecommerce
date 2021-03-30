import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from './../components/CheckoutSteps';

const PlaceOrderScreen = (props) => {
    const cart = useSelector(state => state.cart)
    const { cartItems, shippingAddress, paymentMethod } = cart;

    if(!paymentMethod) {
        props.history.push('/payment')
    }

    const toPrice = (num) => Number(num.toFixed(2));
    console.log(cart)

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
            </div>
        </div>
     );
}
 
export default PlaceOrderScreen;