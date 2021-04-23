import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product';
import Loading from './../components/Loading';
import Message from './../components/Message';
import { listProducts } from './../actions/products';

const HomeScreen = () => {
  const productList = useSelector( (state) => state.productList)
  const { loading, error, products } = productList;
  const dispatch = useDispatch();
  useEffect(()=> {
      dispatch(listProducts({}))
  },[])
    return ( 
      <div>
        { loading ? 
          (<Loading />) 
          : error ? 
          (<Message variant="danger" error={error} />) 
          : ( 
              <div className="row center"> 
                { products.map(product => ( <Product key={ product._id } product={product} /> ))}</div>)}
         
      </div>
       
    )
}
 
export default HomeScreen;