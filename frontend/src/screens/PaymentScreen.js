import React, { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cart';

const PaymentScreen = (props) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if(!shippingAddress.address) {
        props.history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('')
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }
    return ( 
        <div>
            <CheckoutSteps step1 step2 step3/>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Choose Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input 
                            type="radio" 
                            id="paypal" 
                            value="PayPal" 
                            name="paymentMethod" 
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input 
                            type="radio" 
                            id="stripe" 
                            value="Stripe" 
                            name="paymentMethod" 
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                    <button className="btn btn__primary" type="submit">Next</button>
                </div>
            </form>
        </div>
     );
}
 
export default PaymentScreen;
