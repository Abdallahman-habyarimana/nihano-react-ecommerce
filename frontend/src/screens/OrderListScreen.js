import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/order';
import Table from '../components/common/Table';
import Loading from '../components/Loading';
import Message from '../components/Message';

const OrderListScreen = (props) => {

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders} = orderList
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(listOrders())
    },[dispatch])

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
            <button type="button" className="small" onClick={()=> deleteHandler(`/order/${order._id}`)}>Delete</button>    
            </>
        },
       
    ]

    const deleteHandler = (order) => {

    }
    return ( 
        <div>
        <div className="row">
            <h1>Orders</h1>
        </div>
        {   loading ? <Loading /> 
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