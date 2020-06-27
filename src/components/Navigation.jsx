import React, { Component } from 'react';
import { Badge } from '@material-ui/core';
import { connect } from 'react-redux';

class Navigation extends Component {
    render() {
        return (
            <li className="NavButtons" style={{ fontSize: "15px" }}>
                <a href="/" style={{ color: "white", fontSize: "25px", textDecoration: 'none' }}> &#xf02d; BookStore</a>
                <input style={{ fontFamily: "fontawesome", width: "450px", height: "25px", fontSize: "15px" }} placeholder="&#xf002;  Search..."></input>
                <div>
                    <a href="/signin" style={{ color: "white", textDecoration: 'none', padding:"8px", border:"1px groove white" }}>Signin </a>
                    <a className="cartIcon" href="/Cart" ><Badge color="primary" badgeContent={this.props.cartBookCount === this.props.cartCount ? this.props.cartBookCount : this.props.cartCount } showZero></Badge>&#xf07a;  Cart</a>
                    <a href="/wishlist" style={{ color: "white", textDecoration: 'none' }}><Badge color="primary" badgeContent={this.props.wishBookCount === this.props.wishListCount ? this.props.wishBookCount : this.props.wishListCount } showZero></Badge>   &#xf08A;  WishList</a>
                </div>
            </li>
        )
    }
} 

const mapStateToProps = (state) => ({
    cartCount: state.cartCount,
    wishListCount: state.wishListCount
});

export default connect(mapStateToProps) (Navigation);