import React, { Component } from "react";
import BookData from './BookDataLayer';
import { Link } from 'react-router-dom';

var bookData = new BookData();

export default class OrderSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            summaryBookList: []
        }
    }

    async componentDidMount() {
        await bookData.getAllCartBook(response => {
            this.setState({
                summaryBookList: response
            })
        });
    }

    render() {
        return (
            <div className="OrderSummary">
                <div>
                    <h3>Order Summary</h3>
                    {this.state.summaryBookList.map(book => (
                        <div className="orderList" key={book.id}>
                            <div>
                                <img style={{ height: '150px', width: '120px' }} src={book.picPath} alt="" />
                            </div>
                            <div>
                                <h4 style={{ height: "0px", marginLeft: "20px" }}>{book.nameOfBook}</h4>
                                <h5 style={{ height: "0px", opacity: '0.5', marginLeft: "20px" }}>By {book.author}</h5>
                                <h4 style={{ height: "0px", marginLeft: "20px" }}>Rs. {book.price}</h4></div>
                        </div>
                    ))}
                </div>

                <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <Link to="/Order" style={{ textDecoration: "none" }}>
                        <button className="checkoutButton">CHECKOUT </button>
                    </Link>
                </div>
            </div>
        )
    }
}

