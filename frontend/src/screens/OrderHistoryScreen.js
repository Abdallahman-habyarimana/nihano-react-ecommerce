import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { listOrderMine } from '../actions/order';

const OrderHistoryScreen = (props) => {
    const myOrder = useSelector((state) => state.myOrderList);
    const { loading, error, orders } = myOrder

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch])
    return ( 
        <div>
            <h1>Order History</h1>
            { loading ? <Loading /> : 
                error ? <Message variant="danger" error={error} /> :
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>    
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No' }</td>
                                <td>{order.isDelivered ? order.isDelivered.substring(0, 10) : 'No' }</td>
                                <td>
                                    <button type="button" className="small" onClick={() => props.history.push(`/order/${order._id}`)}>
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                }
        </div>
     );
}
 
export default OrderHistoryScreen;