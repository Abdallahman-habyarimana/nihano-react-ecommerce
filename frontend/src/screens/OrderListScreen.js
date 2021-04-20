import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrders, listOrders } from '../actions/order';
import Table from '../components/common/Table';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { ORDER_DELETE_RESET } from '../constants/order';

const OrderListScreen = (props) => {

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders} = orderList

    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete


    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch({ type: ORDER_DELETE_RESET })
        dispatch(listOrders())
    },[dispatch, successDelete])
    
    const deleteHandler = (order) => {
        if(window.confirm('Are you sure to delete')){
            dispatch(deleteOrders(order._id))
        }
    }

    const columns = [
        { path: '_id', label: 'ID'},
        { path: 'user.name', label: 'USER'},
        { path: 'createdAt', label: 'DATE' },
        { path: 'totalPrice', label: 'TOTAL'},
        { path: 'isPaid', label: 'PAID' },
        { path: 'isDelivered', label: 'DELIVERED' },
        { key: 'detail', label:'Actions', content: order => 
            <>
            <button type="button" className="small" onClick={()=> props.history.push(`/order/${order._id}`)}>Details</button>
            <button type="button" className="small" onClick={()=> deleteHandler(order)}>Delete</button>    
            </>
        },
       
    ]

    return ( 
        <div>
        <div className="row">
            <h1>Orders</h1>
        </div>
        { loadingDelete && <Loading /> }
        { errorDelete && <Message variant="danger" error={errorDelete} /> }
        { loading ? <Loading /> 
            :
            error? <Message variant="danger" error={error} />
            :
            (
                <Table columns={columns} data={orders} /> 
            )
        }
    </div>
     );
}
 
export default OrderListScreen;