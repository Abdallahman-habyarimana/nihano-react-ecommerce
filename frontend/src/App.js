import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { signout } from './actions/users'

import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/orderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import EditProductScreen from './screens/EditProductScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/products';
import Loading from './components/Loading';
import Message from './components/Message';

function App() {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false)
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart

  const loggedUser = useSelector(state => state.userSignin )
  const { userInfo }= loggedUser;

  const productCategories = useSelector(state => state.productCategories)
  const { loading: loadingCategory, error:errorCategory, categories } = productCategories

  console.log(categories)

  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout())
  }

  useEffect(() => {
    dispatch(listProductCategories())
  },[dispatch])
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
            <div>
                <button type="button" className="open-sidebar" onClick={() => setSideBarIsOpen(true)}>
                  <i className="fa fa-bars"></i>
                </button>
                <Link to="/" className="brand">Nihano</Link>
            </div>
            <div>
              <Route render={({history}) => <SearchBox history={history}/> } />
            </div>
            <div>
                <Link to="/cart"> <i className="fa fa-shopping-cart"></i> {cartItems.length > 0 && ( <span className="badge">{ cartItems.length}</span>)}</Link>
                { userInfo ? (
                  <div className="collapsible">
                    <Link to="#">Welcome {`  ${userInfo.name}`}  <i className="fa fa-caret-down"></i></Link>
                    <ul className="collapsible-content">
                      <li>
                        <Link to="/profile">
                          Account
                        </Link>
                      </li>
                      <li>
                        <Link to="/orderhistory">
                          My Order
                        </Link>
                      </li>
                      <li>
                        <Link to="#signout" onClick={signoutHandler}>
                          Sign Out
                        </Link>
                      </li>
                      
                    </ul>
                  </div>
                  ) : (
                    <Link to="/signin"><i className="fa fa-user"></i></Link>
                    )}
                     { userInfo && userInfo.isSeller && (
                    <div className="collapsible">
                      <Link to ="#seller">Seller {' '} <i className="fa fa-caret-down"></i></Link>
                      <ul className="collapsible-content">
                        <li>
                          <Link to="/productlist/seller">Products</Link>
                        </li>
                        <li>
                          <Link to="/orderlist/seller">Orders</Link>
                        </li>
                      </ul>
                    </div>
                    
                  )}
                    { userInfo && userInfo.isAdmin && (
                    <div className="collapsible">
                      <Link to ="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                      <ul className="collapsible-content">
                        <li>
                          <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                          <Link to="/productlist">Products</Link>
                        </li>
                        <li>
                          <Link to="/orderlist">Orders</Link>
                        </li>
                        <li>
                          <Link to="/userlist">Users</Link>
                        </li>
                      </ul>
                    </div>
                    
                  )}
            </div>
        </header>
        <aside className={sideBarIsOpen ? 'open' : ''}>
            <ul className="categories">
              <li>
                <strong>Categories</strong>
                <button className="close-sidebar" type="button" onClick={() => setSideBarIsOpen(false)}  >
                  <i className="fa fa-close"></i>
                </button>
              </li>
              {loadingCategory ? ( <Loading /> )
              : errorCategory ? (<Message variant="danger" error={errorCategory } /> )
              : (
                categories.map((c) => (
                  <li key={c}>
                    <Link to={`/search/category/${c}`} onClick={() => setSideBarIsOpen(false)}>{c}</Link>
                  </li>
                ))
              )}
            </ul>
        </aside>
        <main>
          <Route path="/seller/:id" component={SellerScreen} />
          <Route path="/signin" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/search/name/:name?" component={SearchScreen} exact />
          <Route path="/search/category/:category" component={SearchScreen} exact />
          <Route path="/search/category/:category/name/:name" component={SearchScreen} exact />
          <Route path="/search/category/:category/name/:name/min/:min/max/:max" component={SearchScreen} exact />
          <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order" component={SearchScreen} exact />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <AdminRoute path="/productlist" component={ProductListScreen} exact />
          <AdminRoute path="/product/:id/edit" component={EditProductScreen} />
          <AdminRoute path="/orderlist" component={OrderListScreen} exact/>
          <SellerRoute path="/productlist/seller" component={ProductListScreen} />
          <SellerRoute path="/orderlist/seller" component={OrderListScreen} />
          <AdminRoute path="/userlist" component={UserListScreen} />
          <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/" component={HomeScreen} exact />
            
        </main>
        <footer className="row center">
            All right reserved
        </footer>
    </div>
    </Router>
    
  );
}

export default App;
