import React, { Component } from 'react';
import { Badge } from '@material-ui/core';
import { connect } from 'react-redux';

class Navigation extends Component {
    constructor() {
        super()
        this.state = {
            searchText: ''
        }
    }

    handleSearchText = async (e) => {
        await this.setState({
            searchText: e.target.value
        })
        console.log("searchText", this.state.searchText)
    }

    handleSearch = () => {
        console.log("searching", this.state.searchText)
        this.props.dispatch({ type: "searchUpdate", payload: this.state.searchText })
    }

    handleSignOut = () => {
        localStorage.removeItem("token");
    }

    render() {
        return (
            <li className="NavButtons" style={{ fontSize: "15px" }}>
                <a href="/" style={{ color: "white", fontSize: "25px", textDecoration: 'none' }}> &#xf02d; BookStore</a>
                <div>
                    <input style={{ fontFamily: "fontawesome", width: "450px", height: "25px", fontSize: "15px" }} onChange={(e) => this.handleSearchText(e)} placeholder="&#xf002;  Search..."></input>
                    <button onClick={this.handleSearch} style={{ fontFamily: "fontawesome", width: '31px', height: '31px' }}>&#xf002;</button>
                </div>
                <div>
                    {localStorage.getItem("token") === null ? 
                    <a href="/signin" style={{ color: "white", textDecoration: 'none', padding: "8px", border: "1px groove white" }}>Signin </a>
                    : <a href="/" style={{ color: "white", textDecoration: 'none', padding: "8px", border: "1px groove white" }} onClick={this.handleSignOut}>SignOut </a> }
                    <a className="cartIcon" href="/Cart" ><Badge color="primary" badgeContent={this.props.cartBookCount === this.props.cartCount ? this.props.cartBookCount : this.props.cartCount} showZero></Badge>&#xf07a;  Cart</a>
                    <a href="/wishlist" style={{ color: "white", textDecoration: 'none' }}><Badge color="primary" badgeContent={this.props.wishBookCount === this.props.wishListCount ? this.props.wishBookCount : this.props.wishListCount} showZero></Badge>   &#xf08A;  WishList</a>
                </div>
            </li>
        )
    }
}

const mapStateToProps = (state) => ({
    cartCount: state.cartCount,
    wishListCount: state.wishListCount,
    searchText: state.searchText
});

export default connect(mapStateToProps)(Navigation);