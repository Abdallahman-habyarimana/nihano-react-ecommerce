import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cart';
import CheckoutSteps from './../components/CheckoutSteps';

const ShippingAddressScreen = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    
    const cart =  useSelector(state => state.cart);
    const { shippingAddress } = cart

    const [lat, setLat] = useState(shippingAddress.lat)
    const [lng, setLng] = useState(shippingAddress.lng)

    const userAddressMap =  useSelector(state => state.userAddressMap );
    const { address: addressMap } = userAddressMap

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
        const newLat = addressMap ? addressMap.lat : lat
        const newLng = addressMap ? addressMap.lng : lng

        if(addressMap) {
            setLat(addressMap.lat)
            setLng(addressMap.lng)
        }

        let moveOn = true
        if( !newLat || !newLng )
            moveOn = window.confirm(
                'You did not set your location on map. continue?'
            )
        if(moveOn) {
            dispatch(saveShippingAddress({ 
                fullName, 
                address,
                city, 
                postalCode, 
                country,
                lat: newLat,
                lng: newLng }))
            props.history.push('/payment')
        }
    }
    const chooseOnMap = () => {
        dispatch(saveShippingAddress({
            fullName, 
            address,
            city, 
            postalCode, 
            country,
            lat,
            lng
        }))
        props.history.push('/map')
    }
    return ( 
        <div>
            <CheckoutSteps step1 step2 />
            <form className="form" onSubmit={submitHandler}>
                <div>Address Information</div>
                <div>
                    <label htmlFor="fullName"> Full Name</label>
                    <input type="text" id="fullName" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="address"> Address</label>
                    <input type="text" id="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="city"> City </label>
                    <input type="text" id="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="postalCode"> Postal Code</label>
                    <input type="text" id="postalCode" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="country"> Country </label>
                    <input type="text" id="country" placeholder="Country Name" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="chooseOnMap"> Location </label>
                    <button type="button" onClick={chooseOnMap}>Choose On Map</button>
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