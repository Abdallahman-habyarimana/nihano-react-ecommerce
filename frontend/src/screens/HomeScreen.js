import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product';
import Loading from './../components/Loading';
import Message from './../components/Message';
import { listProducts } from './../actions/products';
import { Link } from 'react-router-dom';
import { listTopSellers } from '../actions/users';

const HomeScreen = () => {
  const productList = useSelector( (state) => state.productList)
  const { loading, error, products } = productList;

  const userTopSellerList = useSelector( (state) => state.userTopSellerList)
  const { loading: loadingSellers, error: errorSellers, users: sellers } = userTopSellerList;
  
  const dispatch = useDispatch();
  useEffect(()=> {
      dispatch(listProducts({}))
      dispatch(listTopSellers())
  },[dispatch])
    return ( 
      <div>
        <h2>Top Sellers</h2>
        { loadingSellers ? 
          (<Loading />) 
          : errorSellers ? 
          (<Message variant="danger" error={error} />) 
          : ( 
            <>
                {sellers.length === 0 && <Message error={`No Seller Found`} /> }
                <Carousel showArrows autoPlay showThumbs={false}>
                  {sellers.map((seller) => (
                    <div key={seller._id}>
                      <Link to={`/seller/${seller._id}`}>
                        <img src={seller.seller.logo} alt={seller.seller.name} />
                        <p className="legend">{seller.seller.name}</p>
                      </Link>
                    </div>
                  ))}
                </Carousel>
            </>
              
            )}
         
        <h2>Featured Products</h2>
        { loading ? 
          (<Loading />) 
          : error ? 
          (<Message variant="danger" error={error} />) 
          : ( 
            <>
              {products.length === 0 ? <Message error={`No Product Found`} /> : (
                <div className="row center"> 
                  { products.map(product => ( <Product key={ product._id } product={product} /> ))}
                </div>
            )}
            </>
          )}
         </div>   
       
    )
}
 
export default HomeScreen;