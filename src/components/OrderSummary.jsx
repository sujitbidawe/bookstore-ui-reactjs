import React, { Component } from "react";
import BookData from './BookDataLayer';

var bookData = new BookData();

export default class OrderSummary extends Component {
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
            <div className="OrderSummary">
                <div>
                    <h3>Order Summary</h3>
                </div>
                {this.state.bookList.map(book => (
                    <div className="orderList" key={book.id}>
                        <div>
                            <img style={{ height: '150px', width: '120px' }} src={book.image} alt="" />
                        </div>
                        <div>
                            <h4 style={{ height: "0px", marginLeft: "20px" }}>{book.bookTitle}</h4>
                            <h5 style={{ height: "0px", opacity: '0.5', marginLeft: "20px" }}>By {book.authorName}</h5>
                            <h4 style={{ height: "0px", marginLeft: "20px" }}>Rs. {book.price}</h4></div>
                    </div>
                ))}
                <div className="purchaseButton">
                    <button href="/Order">CHECKOUT </button>
                </div>
            </div>
        )
    }
}

