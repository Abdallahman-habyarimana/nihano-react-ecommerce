import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import data from './../data';

const ProductScreen = (props) => {
    const id = props.match.params.id
    const product = data.products.find(x => x._id === id)
    if (!product) return <div>Product Not Found</div>
    return ( 
        <div>
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
                                <div>{ product.countInStock > 0 ? (<span className="success">In Stock </span>) : (<span className="error">Not in Stock</span>) }</div>
                            </div>
                        </li>
                        <li>
                            <button className="btn btn__primary block">ADD TO CART</button>
                        </li>
                    </ul>   
                </div> 
                
            </div>;
        </div>
        
    )
}
 
export default ProductScreen;