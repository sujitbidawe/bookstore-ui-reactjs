import React, { Component } from 'react';

export default class Navigation extends Component {
    render() {
        return (
            <li className="NavButtons" style={{ fontSize: "15px" }}>
                <a href="/" style={{ color: "white", fontSize: "25px", textDecoration: 'none' }}> &#xf02d; BookStore</a>
                <input style={{ fontFamily: "fontawesome", width: "450px", height: "25px", fontSize: "15px" }} placeholder="&#xf002;  Search..."></input>
                <div>
                    <a className="cartIcon" href="/Cart" style={{ color: "white", textDecoration: 'none', fontFamily: "fontawesome" }}>&#xf07a;Cart</a>
                    <a href="/wishlist" style={{ color: "white", textDecoration: 'none' }}>   &#xf08A;WishList</a>
                </div>
            </li>
        )
    }
} 