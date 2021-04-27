import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/products";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { prices, ratings } from "../utils";

const SearchScreen = (props) => {
    const { 
        name = 'all', 
        category = 'all', 
        min=0, 
        max=0, 
        rating=0,
        order= ''
    } = useParams();
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList
    
    const productCategories = useSelector(state => state.productCategories)
    const { loading: loadingCategory, error:errorCategory, categories } = productCategories

    console.log(categories)
    
    useEffect(() => {
        dispatch(listProducts({ name: name !== 'all' ? name :'', category: category !== 'all' ? category : '', min, max, rating, order }))
    }, [dispatch, name, category, min, max, rating, order])

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category
        const filterName = filter.name || name;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`
    }
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
                        <div>
                            Sort by {' '}
                            <select value={order} onChange={e => props.history.push(getFilterUrl({ order: e.target.value}))}>
                                <option value="newest">Newest Arrivals</option>
                                <option value="lowest">Price: Low to High</option>
                                <option value="highest">Price: High to Low</option>
                                <option value="toprated">Avg. Customer Reviews</option>
                            </select>
                        </div>
                    </div>
                    <div className="row top">
                        <div className="col-1">
                            <h3>Department</h3>
                            <div>
                            {
                              loadingCategory ? <Loading />
                              : errorCategory? <Message variant="danger" error={errorCategory}/> 
                              : (
                                <ul>
                                    <li>
                                        <Link className={'all' === category ? 'active' : ''} to={getFilterUrl({ category: 'all'})}>
                                            Any
                                        </Link>
                                    </li>
                                    {categories.map(cat => (
                                        <li key={cat}>
                                            <Link className={cat === category ? 'active' : ''} to={getFilterUrl({ category: cat})}>
                                                {cat}
                                            </Link>
                                        </li>
                                    ))}
                                </ul> 
                                )  
                            }
                            </div>
                            <div>
                                <h3>Price</h3>
                                <ul>
                                    {prices.map((p) => (
                                        <li key={p.name}>
                                            <Link to={getFilterUrl({ min: p.min, max: p.max})} className={`${p.min} - ${p.max}` === `${min}-${max}` ? 'active' : ''}>
                                                {p.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3>Avg Customer Reviews</h3>
                                <ul>
                                    {ratings.map((r) => (
                                        <li key={r.name}>
                                            <Link to={getFilterUrl({ rating: r.rating })} className={ r.rating === rating ? 'active' : '' }>
                                                <Rating caption={`${r.name}`} rating={r.rating} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
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