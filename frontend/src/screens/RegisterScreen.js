import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { register } from './../actions/users';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function RegisterScreen(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    
    
    const registerUser = useSelector(state => state.userRegister )
    const { userInfo, loading, error }= registerUser

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        // Todo: loggin action
        if( password !== confirmPassword) {
            alert('Password does not match')
        } else {
            dispatch(register(name, email, password))
        }
        
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
                    <h1>Register your Account </h1>
                </div>
                {loading && <Loading></Loading>}
                {error && <Message variant="danger" error={error} />}
                <div>
                    <label htmlFor={name}>Your Name</label>
                    <input type="text" id="name" placeholder="Enter Your Name" onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor={email}>Email</label>
                    <input type="email" id="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor={password}>Password</label>
                    <input type="password" id="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor={confirmPassword}>Password</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                <div>
                    <label />
                    <button className="btn btn__primary" type="submit">Register</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account? { ' '}
                        <Link to="/signin">Log in to your Account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
