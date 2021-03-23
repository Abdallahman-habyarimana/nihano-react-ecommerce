import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Product from '../components/Product';
import Loading from './../components/Loading';
import Message from './../components/Message';

const HomeScreen = () => {
  const [products, setProducts ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  useEffect(()=> {
    const getData = async() => {
      try {
        setLoading(true)
        const { data } = await axios.get('/api/products');
        setLoading(false)
        setProducts(data)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
      
    }; 
    getData();
  },[])
    return ( 
      <div>
        { loading ? (<Loading />) : error ? (<Message variant="danger" error={error} />) : (<div className="row center"> { products.map(product => ( <Product key={product._id} product={product} /> ))}</div>)}
         
      </div>
       
    )
}
 
export default HomeScreen;