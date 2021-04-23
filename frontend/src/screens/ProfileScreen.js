import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { USER_UPDATE_PROFILE_RESET } from '../constants/users';
import { detailsUser, updateUserProfile } from './../actions/users';

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [sellerName, setSellerName] = useState('')
    const [sellerLogo, setSellerLogo] = useState('')
    const [description, setDescription] = useState('')

    const userSignin = useSelector(state => state.userSignin );
    const { userInfo } = userSignin;

    const userDetails = useSelector(state => state.userDetails );
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector( state => state.userUpdateProfile)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate

    const dispatch = useDispatch();

    useEffect(() => {
        if(!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(detailsUser(userInfo._id))
        } else {
            setName(user.name)
            setEmail(user.email)
            if(user.isSeller) {
                setSellerName(user.seller.name)
                setSellerLogo(user.seller.logo)
                setDescription(user.seller.description)
            }
        }
        
    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password not matched')
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password, sellerName, sellerLogo, description }))
        }
    }

    return ( 
        <div>
            <form className="form" onSubmit={submitHandler}>
                <h1>User Profile</h1>
            
            {
                loading? <Loading /> :
                error ? <Message variant="danger" error /> : 
                <>
                    { loadingUpdate && <Loading /> }
                    { errorUpdate && <Message variant="danger" error={errorUpdate}/>}
                    { successUpdate && <Message variant="alert-success" error="Profile Updated Successfully" />}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" type="password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    {
                        user.isSeller && (
                            <>
                                <h2>Seller Information</h2>
                                <div>
                                    <label htmlFor="sellerName">Seller Name</label>
                                    <input id="sellerName" type="text" placeholder="Enter Your Seller Name" value={sellerName} onChange={(e) => setSellerName(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="sellerLogo">Logo</label>
                                    <input id="sellerLogo" type="text" placeholder="Upload Logo" value={sellerLogo} onChange={(e) => setSellerLogo(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <input id="description" type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            </>
                        )
                    }
                    <div>
                        <label />
                        <button className="btn btn__primary btn__block" type="submit">Update</button>
                    </div>
                </>
            }
        </form>
        </div>
     );
}
 
export default ProfileScreen;