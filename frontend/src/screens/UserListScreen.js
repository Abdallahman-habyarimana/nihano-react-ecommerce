import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Table from "../components/common/Table";
import { listUsers, deleteUser } from "../actions/users";
import {  USER_DETAILS_RESET } from "../constants/users";



const UserListScreen = (props) => {

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList
    const dispatch = useDispatch();

    const userDelete = useSelector(state => state.userDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete

    useEffect(() => {
        dispatch(listUsers())
        dispatch({ type: USER_DETAILS_RESET})
    }, [dispatch, successDelete])

    
    const deleteHandler = (user) => {
        if(window.confirm('Are you sure to delete')){
            dispatch(deleteUser(user._id))
    }
        
    }
    
    const columns = [
        { path: '_id', label: 'ID'},
        { path: 'name', label: 'Name' },
        { path: 'isSeller', label: 'SELLER'},
        { path: 'isAdmin', label: 'ADMIN' },
        { key: 'edit', label:'Actions', content: user =>
        <> 
            <button type="button" className="small" onClick={()=> props.history.push(`/user/${user._id}/edit`)}>Edit</button> 
            <button type="button" className="small" onClick={()=> deleteHandler(user)}>Delete</button>
        </>
        },
 
    ]
    return ( 
        <div>
            <h1>Users List</h1>
                { loadingDelete && <Loading />}
                { errorDelete && <Message variant="danger" error={errorDelete}/>}
               {   loading ? <Loading /> 
                :
                error? <Message variant="danger" error={error} />
                :
                (
                    <Table columns={columns} data={users} /> 
                )
            }
        </div>
     );
}
 
export default UserListScreen;