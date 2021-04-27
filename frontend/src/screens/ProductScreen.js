import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, detailsProduct } from '../actions/products';
import Loading from './../components/Loading';
import Message from './../components/Message';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/products';

const ProductScreen = (props) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch();
    const productDetails = useSelector( state => state.productDetails )
    const productId = props.match.params.id
    const [qty, setQty] = useState(1)
    const { error, loading, product } = productDetails;

    const userSignin = useSelector( state => state.userSignin )
    const { userInfo } = userSignin

    const productReview = useSelector( state => state.productReview )
    const { error: errorReview, loading: loadingReview, success: successReview } = productReview;

    useEffect(()=> {
        if(successReview){
            window.alert('Review Submitted Successfully')
            setRating('')
            setComment('')
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET })
        }
     dispatch(detailsProduct(productId))
    },[dispatch, productId, successReview])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        
        if(comment && rating){
            dispatch(createReview(productId, {rating, comment, name: userInfo.name}))
        } else {
            alert('Please enter comment and rating')
        }
    }
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
                    <div className="card card-body">
                        <ul>
                            <li>
                                SELLER{' '}
                                <h2>
                                    <Link to={`/seller/${product.seller._id}`}>
                                        {product.seller.name}
                                    </Link>
                                </h2>
                                {/* <Rating rating={product.seller.seller.rating} numReviews={product.seller.seller.numReviews} /> */}
                            </li>
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
                            {
                                product.countInStock > 0 && (
                                    <>
                                    <li>
                                        <div className="row">
                                            <div>Qty</div>
                                            <div>
                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x+1} value={x+1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                        <li>
                                            <button onClick={addToCartHandler} className="btn btn__primary">ADD TO CART</button>
                                        </li>
                                    </>
                                
                                )
                            }
                        
                        </ul>   
                    </div>
                </div> 
            </div>
            <div id="reviews">
                <h2>Reviews</h2>
                {product.reviews.length === 0 && (<Message error="There is no review" />)}
                <ul>
                    {product.reviews.map((review) => (
                        <li id={review._id}>
                            <strong>{review.name}</strong>
                            <Rating rating={review.rating} caption="" />
                            <p>
                                {review.createdAt.substring(0,10)}
                            </p>
                            <p>{review.comment}</p>
                        </li>
                    ))}
                    <li>
                        {userInfo ? (
                            <form className="form" onSubmit={submitHandler}>
                                <div>
                                    <h2>Write a customer review</h2>
                                </div>
                                <div>
                                    <label htmlFor="rating">Rating</label>
                                    <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                                        <option value="">Select...</option>
                                        <option value="1">1- Poor</option>
                                        <option value="2">2- Fair</option>
                                        <option value="3">3- Good</option>
                                        <option value="4">4- Very Good</option>
                                        <option value="5">5- Excellent</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="comment">Comment</label>
                                    <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}>

                                    </textarea>
                                </div>
                                <div>
                                    <label />
                                    <button className="btn btn__primary" type="submit" >Submit</button>
                                </div>
                                <div>
                                    { loadingReview && <Loading />}
                                    { errorReview && <Message variant="danger" error={errorReview} /> }
                                </div>
                            </form>
                        ): (
                            <Message variant="alert"> Please <Link to="/signin">Log In</Link> to Write a review </Message>
                        )}
                    </li>
                </ul>
            </div>
        </div>)}
         
      </div>
        
        
    )
}
 
export default ProductScreen;