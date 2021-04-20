import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from "../constants/products";
import { createProduct, listProducts, deleteProduct } from '../actions/products';
import Table from "../components/common/Table";

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

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete
    
    useEffect(() => {
        if(successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            props.history.push(`/product/${newProduct._id}/edit`)
        }
        if(successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET })
        }
        dispatch(listProducts())
    }, [newProduct, dispatch, props.history, successCreate, successDelete])

    
    const deleteHandler = (product) => {
        if(window.confirm('Are you sure to delete')){
            dispatch(deleteProduct(product._id))
        }
        
    }

    const createHandler = () => {
        dispatch(createProduct())
    }

    const columns = [
        { path: '_id', label: 'ID'},
        { path: 'name', label: 'Name' },
        { path: 'price', label: 'price'},
        { path: 'category', label: 'Category' },
        { path: 'brand', label: 'Brand'},
        { key: 'edit', label:'Actions', content: product => <button type="button" className="small" onClick={()=> props.history.push(`/product/${product._id}/edit`)}>Edit</button> },
        { key: 'edit', content: product => <button type="button" className="small" onClick={()=> deleteHandler(product)}>Delete</button> }
 
    ]
    return ( 
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="btn btn__primary" onClick={createHandler}>
                    New Products
                </button>
            </div>
            { loadingDelete && <Loading />}
            { errorDelete && <Message variant="danger" error={errorDelete} />}

            { loadingCreate && <Loading />}
            { errorCreate && <Message variant="danger" error={errorCreate} />}
            {   loading ? <Loading /> 
                :
                error? <Message variant="danger" error={error} />
                :
                (
                    <Table columns={columns} data={products} /> 
                )
            }
        </div>
     );
}
 
export default ProductListScreen;