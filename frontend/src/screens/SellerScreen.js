import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/products';
import { detailsUser } from '../actions/users';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Product from '../components/Product';
import Rating from '../components/Rating';

const SellerScreen = (props) => {
    const sellerId = props.match.params.id;

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user} = userDetails
    
    const productList = useSelector(state => state.productList)
    const { loading: loadingProduct, error: errorProduct, products} = productList

    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(detailsUser(sellerId))
        dispatch(listProducts({ seller: sellerId}))
    }, [dispatch, sellerId])
    return ( 
        <div className="row top">
            <div className="col-1">
                {loading ? <Loading /> 
                : 
                error? <Message variant="danger" error={error} />
                : (
                    <ul className="card card-body">
                        <li>
                            <div className="row start">
                                <div className="p-1">
                                    <img className="small" src={user.seller.logo} alt={user.seller.name} />
                                </div>
                                <div>
                                    <h1>{user.seller.name}</h1>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Rating rating={user.seller.rating} numReviews={`${user.seller.numReviews}`}/>
                        </li>
                        <li>
                            <a href={`mailto:${user.email}`}>Contact Seller</a>
                        </li>
                        <li>
                            {user.seller.description}
                        </li>
                    </ul>
                )}
            </div>
            <div className="col-3">
                {loadingProduct ? <Loading /> 
                : 
                errorProduct? <Message variant="danger" error={errorProduct} />
                : (
                    <>
                        {products.length === 0 && (<Message error={errorProduct} />) }
                        <div className="row center">
                            { products.map(product => ( <Product key={ product._id } product={product} /> ))}
                        </div>
                    </>
                    
                )
                }
            </div>
        </div>
     );
}
 
export default SellerScreen;