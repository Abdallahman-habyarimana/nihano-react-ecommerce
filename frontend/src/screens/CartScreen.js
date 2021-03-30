import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { addToCart, removeFromCart } from './../actions/cart';

const CartScreen = (props) => {
    const dispatch = useDispatch()
    const productId = props.match.params.id
    const qty = props.location.search 
        ? Number(props.location.search.split('=')[1]) : 1;
    const cart =  useSelector(state => state.cart);
    const { cartItems } = cart
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }
    return ( 
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                { cartItems.length === 0 ? <Message> Your cart is empty. <Link to="/">Go back to shopping </Link>
                </Message> : (
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
                                    <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map(x => (
                                            <option key={x+1} value={x+1}>{x + 1}</option>
                                        ))}
                                    </select>
                                
                                <div>${item.price}</div>
                                <div>
                                    <i class="fa fa-trash-o icon" onClick={() => removeFromCartHandler(item.product)}></i>
                                </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Price Total ({ cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)} </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className="btn btn__primary" disabled={cartItems.length === 0 }> Proceed to Checkout </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
     );
}
 
export default CartScreen;