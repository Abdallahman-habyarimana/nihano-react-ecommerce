import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from './../actions/users';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function LoginScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    
    
    const loggedUser = useSelector(state => state.userSignin )
    const { userInfo, loading, error }= loggedUser

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        // Todo: loggin action
        dispatch(signin(email, password))
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])
    
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Loggin </h1>
                </div>
                {loading && <Loading></Loading>}
                {error && <Message variant="danger" error={error} />}
                <div>
                    <label htmlFor={email}>Email</label>
                    <input type="email" id="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor={email}>Password</label>
                    <input type="password" id="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label />
                    <button className="btn btn__primary" type="submit">Log In</button>
                </div>
                <div>
                    <label />
                    <div>
                        Don't have an account? { ' '}
                        <Link to={`/register?redirect=${redirect}`}>Create a new account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
