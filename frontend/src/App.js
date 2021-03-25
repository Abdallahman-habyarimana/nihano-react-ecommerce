import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { useSelector } from 'react-redux'

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart

  return (
    <Router>
      <div className="grid-container">
        <header className="row">
            <div>
                <Link to="/" className="brand">Nihano</Link>
            </div>
            <div>
                <Link to="/cart"> <i className="fa fa-shopping-cart"></i> {cartItems.length > 0 && ( <span className="badge">{ cartItems.length}</span>)}</Link>
                <Link to="/signin"><i className="fa fa-user"></i></Link>
            </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/" exact component={HomeScreen} />
        
            
        </main>
        <footer className="row center">
            All right reserved
        </footer>
    </div>
    </Router>
    
  );
}

export default App;
