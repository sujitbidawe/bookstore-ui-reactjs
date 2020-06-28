import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Wishlist from './components/Wishlist';
import Home from "./components/Home";
import Cart from "./components/Cart";
import OrderConfirm from './components/OrderConfirm';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import BookData from './components/BookDataLayer';
import SignIn from './components/signin';
import SignUp from './components/signup';
import ResetPassword from './components/ResetPassword';
import NewPassword from './components/NewPassword';

const initialState = {
  cartCount: 0,
  wishListCount: 0,
  searchText: ''
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "cartUpdate":
      return {
        cartCount: action.payload,
        wishListCount: state.wishListCount
      }
    case "wishListUpdate":
      console.log("wishupdate", action.payload)
      return {
        cartCount: state.cartCount,
        wishListCount: action.payload
      }
    case "searchUpdate":
      console.log("searchUpdateReducer", action.payload)
      return {
        cartCount: state.cartCount,
        wishListCount: state.wishListCount,
        searchText: action.payload
      }  
    default:
      return {
        cartCount: state.cartCount,
        wishListCount: state.wishListCount
      };
  }
};

const store = createStore(reducer);
var bookData = new BookData();

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartBookCount: "",
      wishBookCount: ""
    }
  }

  async componentDidMount() {
    await bookData.getAllCartBook(response => {
      this.setState({
        cartBookCount: response.length
      })
    });
    await bookData.getAllWishlistBook(response => {
      this.setState({
        wishBookCount: response.length
      })
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App" >

          <div className="App-header">
            <Navigation cartBookCount={this.state.cartBookCount} wishBookCount={this.state.wishBookCount} />
          </div>

          <div className="PageRoute">
            <BrowserRouter>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/cart" component={Cart} exact />
                <Route path="/Wishlist" component={Wishlist} exact />
                <Route path="/Order" component={OrderConfirm} exact />
                <Route path="/signin" component={SignIn} exact />
                <Route path="/signup" component={SignUp} exact />
                <Route path="/resetpassword" component={ResetPassword} exact />
                <Route path="/passwordset/*" component={NewPassword}  />
              </Switch>
            </BrowserRouter>
          </div>

          <footer className="footer">
            <text is="x3d">
              Copyright &#xf1f9; 2020, Bookstore Private Limited. All Rights Reserved
            </text>
          </footer>

        </div>
      </Provider>
    )
  }
}
