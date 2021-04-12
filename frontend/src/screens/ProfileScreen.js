import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { detailsUser } from './../actions/users';

const ProfileScreen = () => {
    const userSignin = useSelector(state => state.userSignin );
    const { userInfo } = userSignin;

    const userDetails = useSelector(state => state.userDetails );
    const { loading, error, user } = userDetails;



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsUser(userInfo._id))
    }, [dispatch, userInfo._id])

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return ( 
        <div>
            <form className="form" onSubmit={submitHandler}>
                <h1>User Profile</h1>
            
            {
                loading? <Loading /> :
                error ? <Message variant="danger" error /> : 
                <>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" placeholder="Enter name" value={user.name}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Enter Email" value={user.email}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Enter password" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" type="password" placeholder="Confirm password" />
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