import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/products';
import Loading from './../components/Loading';
import Message from './../components/Message';

const ProductScreen = (props) => {
    const dispatch = useDispatch();
    const productDetails = useSelector( state => state.productDetails )
    const productId = props.match.params.id
    const { error, loading, product } = productDetails;
    useEffect(()=> {
     dispatch(detailsProduct(productId))
    },[dispatch, productId])
    if (!product) return <div>Product Not Found</div>
    return ( 
        <div>
        { loading ? 
          (<Loading />) 
          : error ? 
          (<Message variant="danger" error={error} />) 
          : ( <div>
            <Link to="/">Back to Product</Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt={product.name}></img>
                </div> 
                <div className="col-1">
                    <ul>
                        <li>
                            {product.name}
                        </li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews} />
                        </li>
                        <li>Price : ${product.price}</li>
                        <li> <p>Description : ${ product.description }</p></li>
                    </ul>
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <div className="row">
                                <div>Price</div>
                                <div className="price">${product.price}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div> Status:  </div>
                                <div>{ product.countInStock > 0 ? (<span className="success">In Stock </span>) : (<span className="danger">Not in Stock</span>) }</div>
                            </div>
                        </li>
                        <li>
                            <button className="btn btn__primary block">ADD TO CART</button>
                        </li>
                    </ul>   
                </div> 
                
            </div>;
        </div>)}
         
      </div>
        
        
    )
}
 
export default ProductScreen;