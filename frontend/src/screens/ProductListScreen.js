import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { listProducts } from './../actions/products';
import { thunk } from 'redux-thunk';

const ProductListScreen = ({ props }) => {
    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const deleteHandler = () => {

    }
    return ( 
        <div>
            <h1>Products</h1>
            {   loading ? <Loading /> 
                :
                error? <Message variant="danger" error={error} />
                :
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={ product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <button type="button" className="small" onClick={()=> props.history.push(`/product/${product._id}/edit`)}>Edit</button>
                                        <button type="button" className="small" onClick={()=> deleteHandler(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
     );
}
 
export default ProductListScreen;