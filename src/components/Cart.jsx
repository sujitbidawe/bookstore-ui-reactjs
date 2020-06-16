import React, { Component } from "react";
import BookData from './BookDataLayer';
import CustomerDetails from './Customerdetails';
import OrderSummary from './OrderSummary';

var bookData = new BookData();

export default class Cart extends Component {
    constructor() {
        super()
        this.state = {
            bookList: [],
            detailsEnabled: false,
            summaryEnabled: false
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

    toggleDetailsView = () => {
        this.setState({
            detailsEnabled : !this.state.detailsEnabled
        })
    }

    toggleSummaryView = () => {
        this.setState({
            summaryEnabled : !this.state.summaryEnabled
        })
    }

    render() {
        return (
            <div className="cart">
                <br />
                <div style={{ border: "1px groove grey", marginBottom: "20px" }}>
                    <h1 style={{ color: "brown", paddingLeft: "20px" }}>
                        My cart
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
                    <div className="purchaseButton" onClick={this.toggleDetailsView}>
                        {/* <text style={{ fontSize: "25px" }}>TOTAL : </text> */}
                        <button onClick={this.toggleSummaryView} style={{ height: "30px", width: "200px", backgroundColor: "rgb(114, 134, 189)", color: "white", fontSize: "25px" }}> PLACE ORDER </button>
                    </div>
                </div>

                {this.state.detailsEnabled &&
                    <div>
                    <CustomerDetails />
                </div>

                }
                {this.state.summaryEnabled &&
                    <div>
                        <OrderSummary />
                    </div>
                }
                </div>
        );
    }
}