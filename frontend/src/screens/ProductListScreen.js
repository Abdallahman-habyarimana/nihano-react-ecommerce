import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { PRODUCT_CREATE_RESET } from "../constants/products";
import { createProduct, listProducts } from '../actions/products';

const ProductListScreen = (props) => {

    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList
    const dispatch = useDispatch();

    const productCreate = useSelector(state => state.productCreate);
    const { 
        loading: loadingCreate, 
        error: errorCreate, 
        success: successCreate, 
        product:newProduct} = productCreate

    useEffect(() => {
        if(successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            props.history.push(`/product/${newProduct._id}/edit`)
        }
        dispatch(listProducts())
    }, [newProduct, dispatch, props.history, successCreate])

    const deleteHandler = () => {

    }

    const createHandler = () => {
        dispatch(createProduct())
    }
    return ( 
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="btn btn__primary" onClick={createHandler}>
                    New Products
                </button>
            </div>
            { loadingCreate && <Loading />}
            { errorCreate && <Message variant="danger" error={errorCreate} />}
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