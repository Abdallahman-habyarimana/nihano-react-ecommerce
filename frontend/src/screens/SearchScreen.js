import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { listProducts } from "../actions/products";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Product from "../components/Product";

const SearchScreen = (props) => {
    const { name = 'all'} = useParams();
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList
    
    useEffect(() => {
        dispatch(listProducts({ name: name !== 'all' ? name :'' }))
    }, [dispatch, name])
    return (   
                <div>
                    <div className="row">
                        {loading ? <Loading />
                        : error? <Message variant="danger" error={error}/> 
                        : (
                            <div>
                                {products.length} Results
                            </div> 
                          )
                        }
                    </div>
                    <div className="row top">
                        <div className="col-1">
                            <h3>Department</h3>
                            <ul>
                                <li>Category 1</li>
                            </ul>
                        </div>
                        <div className="col-3">
                            {loading ? <Loading />
                            : error? <Message variant="danger" error={error}/> 
                            : (
                                <>
                                {products.length === 0 ? <Message error={`No Product Found`} /> : (
                                  <div className="row center"> 
                                    { products.map(product => ( <Product key={ product._id } product={product} /> ))}
                                  </div>
                              )}
                              </>
                            ) 
                        }
                        </div>
                    </div>
                </div>  
            );
}
 
export default SearchScreen;