import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/order';
import CheckoutSteps from './../components/CheckoutSteps';
import Loading from './../components/Loading';
import Message from './../components/Message';

const OrderScreen = (props) => {
    const orderId = props.match.params.id;

    const orderDetails = useSelector(state => state.orderDetail);
    const { loading, error, order} = orderDetails;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(detailsOrder(orderId))
    },[dispatch, orderId])
    return loading ? (<Loading></Loading>): error ? (<Message variant="danger" error/> ) : ( 
        <div>
            <h1>Order {order._id } </h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping Summary</h2>
                                <p>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br/>
                                    <strong>Address:</strong> {order.shippingAddress.address}
                                    {order.shippingAddress.city}, {' '} 
                                    {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered? <Message variant="success" error={`Delivered at ${order.deliveredAt}`} /> : <Message variant="danger" error="Not delivered" /> }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method:</strong> {order.paymentMethod} 
                                </p>
                                
                                {order.isPaid? <Message variant="success" error={`Paid at ${order.paidAt}`} /> : <Message variant="danger" error="Not Paid" /> }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Details</h2>
                                <ul>
                                    {order.orderItems.map( item  => (
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
                                    <div>${order.itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order.taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div> <strong>Total</strong> </div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default OrderScreen;