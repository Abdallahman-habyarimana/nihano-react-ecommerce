import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser} from './../actions/users';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/users';

export default function UserEditScreen(props) {
    const userId = props.match.params.id;
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isSeller, setIsSeller] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails )
    const { user, loading, error }= userDetails
    
    const userUpdate = useSelector(state => state.userUpdate )
    const { success, loading: loadingUpdate, error: errorUpdate }= userUpdate

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin}))
    }

    useEffect(() => {
        if(success){
            dispatch({ type: USER_UPDATE_RESET })
            props.history.push('/userlist')
        }

        if(!user || success) {   
            dispatch(detailsUser(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsSeller(user.isSeller)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, props.history, user, userId, success])
    
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit User ${name} </h1>
                </div>
                {loadingUpdate && <Loading />}
                {errorUpdate && <Message variant="danger" error={errorUpdate} />}
                {loading ? <Loading /> :
                error ? <Message variant="danger" error={error} /> :
                (
                    <>
                        <div>
                            <label htmlFor={name}>Name</label>
                            <input type="text" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor={email}>Password</label>
                            <input type="email" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor={isSeller}>Is Seller</label>
                            <input type="checkbox" id="isSeller" value={isSeller} onChange={e => setIsSeller(e.target.checked)}  />
                        </div>
                        <div>
                            <label htmlFor={isAdmin}>Is Admin</label>
                            <input type="checkbox" id="isAdmin" value={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                        </div>
                        <div>
                            <label />
                            <button className="btn btn__primary" type="submit">Update</button>
                        </div>
                
                    </>
                )
            }
            </form>
        </div>
    )
}
