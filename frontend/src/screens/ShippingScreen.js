import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cart';
import CheckoutSteps from './../components/CheckoutSteps';

const ShippingAddressScreen = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
    const cart =  useSelector(state => state.cart);
    const { shippingAddress } = cart

    console.log(cart)

    if(!userInfo) {
        props.history.push('/signin')
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ fullName, address, city, postalCode, country }))
        props.history.push('/payment')
    }
    return ( 
        <div>
            <CheckoutSteps step1 step2 />
            <form className="form" onSubmit={submitHandler}>
                <div>Address Information</div>
                <div>
                    <label htmlFor="fullName"> Full Name</label>
                    <input type="text" id="fullName" placeHolder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="address"> Address</label>
                    <input type="text" id="address" placeHolder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="city"> City </label>
                    <input type="text" id="city" placeHolder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="postalCode"> Postal Code</label>
                    <input type="text" id="postalCode" placeHolder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="country"> Country </label>
                    <input type="text" id="country" placeHolder="Country Name" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
                <div>
                    <label />
                    <button className="btn btn__primary" type="submit">Next</button>
                </div>
            </form>
        </div>
     );
}
 
export default ShippingAddressScreen;