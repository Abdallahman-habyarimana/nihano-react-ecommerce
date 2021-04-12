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
        }
        
    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password not matched')
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }))
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