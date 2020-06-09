import React from 'react';
import './App.css';
import Navigation from './Navigation';
import Wishlist from './Wishlist';
import Home from "./Home";
import Cart from "./Cart";
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
