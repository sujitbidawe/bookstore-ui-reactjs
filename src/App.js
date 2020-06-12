import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Wishlist from './components/Wishlist';
import Home from "./components/Home";
import Cart from "./components/Cart";
import OrderConfirm from './components/OrderConfirm';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (

    <div className="App" >
      
      <div className="App-header">
        <Navigation />
      </div>
      
      <div className="PageRoute">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/cart" component={Cart} exact />
            <Route path="/Wishlist" component={Wishlist} exact />
            <Route path="/Order" component={OrderConfirm} exact />
          </Switch>
        </BrowserRouter>
      </div>

      <footer className="footer">
        <text is="x3d">
          Copyright &#xf1f9; 2020, Bookstore Private Limited. All Rights Reserved
        </text>
      </footer>
    
    </div>
  );
}

export default App;
