import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
            <div>
                <a href="/" className="brand">Nihano</a>
            </div>
            <div>
                <a href="/cart">0 <i className="fa fa-shopping-cart"></i></a>
                <a href="/signin"><i className="fa fa-user"></i></a>
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
