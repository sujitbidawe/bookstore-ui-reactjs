import React, { Component } from "react";
import BookData from './BookDataLayer';

var bookData = new BookData();

export default class Cart extends Component {
    constructor() {
        super()
        this.state = {
            bookList: []
        }
    }

    async componentDidMount() {
        await bookData.getCartItems(response => {
            this.setState({
                bookList: response
            })
        });
        console.log(this.state.bookList);
    }

    render() {
        return (
            <div className="cart">
                <h1 style={{ color: "brown" }}>
                    Items In Cart
                </h1>
                {this.state.bookList.map(book => (
                    <div className="cartList" key={book.id}>
                        <div>
                            <img style={{ height: '150px', width: '120px' }} src={book.image} alt="" />
                        </div>
                        <div>
                            <h4 style={{ height: "0px" }}>{book.bookTitle}</h4>
                            <h5 style={{ height: "0px", opacity: '0.5' }}>By {book.authorName}</h5>
                            <h4 style={{ height: "0px" }}>Rs. {book.price}</h4></div>
                        <div>
                            <button style={{ backgroundColor: 'brown', color: 'white', width: '150px', height: '30px' }}>MOVE TO WISHLIST</button>
                            <button style={{ fontFamily: "fontawesome", width: '100px', height: '30px', marginLeft: '3.5px' }}>REMOVE</button>
                        </div>
                    </div>
                ))}
                <div className="purchaseButton">
                    <text style={{ fontSize: "25px" }}>TOTAL : </text>
                    <button style={{ height: "40px", width: "300px", backgroundColor: "brown", color: "white", fontSize: "25px" }}> PLACE ORDER </button>
                </div>
            </div>
        );
    }
}