import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/products';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../constants/products';

const EditProductScreen = (props) => {
    const productId = props.match.params.id;
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    
    const productDetails = useSelector( state => state.productDetails);
    const { loading, error, product} = productDetails
    
    const productUpdate = useSelector( state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, product: newUpdate, success: successUpdate} = productUpdate


    const dispatch = useDispatch()
    
    useEffect(() => {
        if(successUpdate){
            props.history.push('/productList')
        }

        if(!product || (product._id !== productId || successUpdate)) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description)
        }
        
    }, [product, dispatch, productId, successUpdate, props.history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price, 
            image,
            category,
            countInStock,
            brand,
            description
        }))
    }
    return ( 
        <div>
            <form className="form" onSubmit={submitHandler}>
                <h1> Edit Product {productId} </h1>
                {loadingUpdate && <Loading />}
                {errorUpdate && <Message variant="danger" error={errorUpdate} />}
                {
                    loading ? <Loading /> :
                    error ? <Message variant="danger" error={error}/> :
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input id="price" type="text" placeholder="Enter Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input id="image" type="text" placeholder="Upload Image " value={image} onChange={(e) => setImage(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <input id="category" type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="countInStock">Quantinty</label>
                            <input id="countInStock" type="text" placeholder="Enter the Quantinty" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="brand">Brand</label>
                            <input id="brand" type="text" placeholder="Enter brand name" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea rows="3" id="description" type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <label />
                            <button className="btn btn__primary btn__block" type="submit">Update</button>
                        </div>
                    </>
                
                }
                    
            </form>
        </div>
     );
}
 
export default EditProductScreen;