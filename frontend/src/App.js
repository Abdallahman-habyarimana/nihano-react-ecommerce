import React from 'react';
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

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart

  const loggedUser = useSelector(state => state.userSignin )
  const { userInfo }= loggedUser;

  const dispatch = useDispatch()

  const signoutHandler = () => {
    dispatch(signout())
  }


  

  return (
    <Router>
      <div className="grid-container">
        <header className="row">
            <div>
                <Link to="/" className="brand">Nihano</Link>
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
        <main>
          <Route path="/signin" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <AdminRoute path="/productlist" component={ProductListScreen} />
          <AdminRoute path="/product/:id/edit" component={EditProductScreen} />
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
