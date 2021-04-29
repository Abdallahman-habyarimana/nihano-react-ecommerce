import Loading from "../components/Loading";
import { LoadScript, GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api'
import { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { USER_ADDRESS_MAP_CONFIRM } from "../constants/users";

const libs = ['places'];
const defaultLocation = { lat: 43.572948, lng: -79.598473}

const MapScreen = (props) => {
    const [googleApiKey, setGoogleApiKey] = useState('')
    const [center, setCenter] = useState(defaultLocation)
    const [location, setLocation] = useState(center)

    const mapRef = useRef(null)
    const placeRef = useRef(null)
    const markerRef = useRef(null)

    const dispatch = useDispatch()
  
    const onLoad = (map) => {
        mapRef.current = map
    }

    const onMarkerLoad = (marker) => {
        markerRef.current = marker
    }

    const onLoadPlaces = (place) => {
        placeRef.current = place
    }

    const onIdle = () => {
        setLocation({ 
            lat: mapRef.current.center.lat(),
            lng: mapRef.current.center.lng()
        })
    }

    const onPlacesChanged = () => {
        const place = placeRef.current.getPlaces()[0].geometry.location;
        setCenter({ lat: place.lat(), lng: place.lng()})
        setLocation({ lat: place.lat(), lng: place.lng()})
    }

    const onConfirm = () => {
        const places = placeRef.current.getPlaces();
        if( places && places.length === 1) {
            dispatch({
                type: USER_ADDRESS_MAP_CONFIRM,
                payload: {
                    lat: location.lat,
                    lng: location.lng,
                    address: places[0].formatted_address,
                    name: places[0].name,
                    vicinity: places[0].vicinity,
                    googleAddressId: places[0].id
                }
            })

            alert("Location selected successfully. ")
            props.history.push("/shipping")
        } else {
            alert('Please enter your address')
        }
    }

    const getUserCurrentLocation = () => {
        if(!navigator.geolocation) {
            alert('Geolocation as not supported by this browser')
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            })
        }
    }

    useEffect(() => {
        const fetch = async() => {
            const { data } = await Axios('/api/config/google');
            setGoogleApiKey(data);
            getUserCurrentLocation()
        }
        fetch()
    }, [])
    return googleApiKey ? ( 
        <div className="full-container">
            <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
                <GoogleMap 
                    id="sample-map" 
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onIdle={onIdle}>
                        <StandaloneSearchBox
                            onLoad={onLoadPlaces}
                            onPlacesChanged={onPlacesChanged}
                        >
                            <div>
                                <input type="text" placeholder="Enter your address" />
                                <button type="button" className="btn btn__primary" onClick={onConfirm}>Confirm</button>
                            </div>
                        </StandaloneSearchBox>
                        <Marker position={location} onLoad={onMarkerLoad}></Marker>
                    </GoogleMap>
            </LoadScript>
        </div>
     ) : <Loading />;
}
 
export default MapScreen;