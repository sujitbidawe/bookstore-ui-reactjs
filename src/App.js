import React from 'react';
import './App.css';
import Navigation from './Navigation';
import About from './About';
import Home from "./Home";
import Cart from "./Cart";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App-header">
          <h2 color="red">
            BookStore
        </h2>
        </div>
        <br />
        <div className="PageTest">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/cart" component={Cart} exact />
              <Route path="/About" component={About} exact />
            </Switch>
            <Navigation />
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
