import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Table from "../components/common/Table";
import { listUsers } from "../actions/users";


const UserListScreen = (props) => {

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])

    
    // const deleteHandler = (product) => {
    //     if(window.confirm('Are you sure to delete')){
    //         dispatch(deleteProduct(product._id))
    // }
        
    // }

    // const createHandler = () => {
    //     dispatch(createProduct())
    

    const columns = [
        { path: '_id', label: 'ID'},
        { path: 'name', label: 'Name' },
        { path: 'isSeller', label: 'SELLER'},
        { path: 'isAdmin', label: 'ADMIN' },
        { key: 'edit', label:'Actions', content: user =>
        <> 
            <button type="button" className="small" >Edit</button> 
            <button type="button" className="small" >Delete</button>
        </>
        },
 
    ]
    return ( 
        <div>
            <h1>Users List</h1>
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