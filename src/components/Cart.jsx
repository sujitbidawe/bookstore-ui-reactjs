import React, { Component } from "react";
import BookData from './BookDataLayer';
import CustomerDetails from './Customerdetails';

var bookData = new BookData();

export default class Cart extends Component {
    constructor() {
        super()
        this.state = {
            bookList: [],
            detailsEnabled: false,
            detailsVisibility: {display: 'none'}
        }
    }

    async componentDidMount() {
        await bookData.getAllCartBook(response => {
            this.setState({
                bookList: response,
            })
        });
    }

    async handleChangeBookRemove(e) {
        await bookData.removeFromCart(101, e, 1)
        await bookData.getAllCartBook(response => {
            this.setState({
                bookList: response
            })
        })
    }

    async handleChangeBookDec(e) {
        let q = e.bookQuantity - 1;
        await bookData.updateCart(101, e.id, q)
        await bookData.getAllCartBook(response => {
            this.setState({
                bookList: response
            })
        })
        await window.location.reload(true)
    }

    async handleChangeBookInc(e) {
        let q = e.bookQuantity + 1;
        await bookData.updateCart(101, e.id, q)
        await bookData.getAllCartBook(response => {
            this.setState({
                bookList: response
            })
        })
        window.location.reload(true)
    }

    async handleAddToWishlist(e) {
        await bookData.addToWishlist(101, e)
        await bookData.removeFromCart(101, e, 1)
        await bookData.getAllCartBook(response => {
            this.setState({
                bookList: response
            })
        })
    }

    toggleDetailsView = async() => {
        console.log("before click cart",this.state.detailsEnabled)
        await this.setState({
            detailsEnabled: true,
            detailsVisibility: {display: 'flex'}

        })
        console.log("after click cart",this.state.detailsEnabled)
    }

    render() {
        return (
            <div className="cart">
                <br />
                <div style={{ border: "1px groove grey", marginBottom: "20px" }}>
                    <h1 style={{ color: "brown", paddingLeft: "20px" }}>
                        Cart( {this.state.bookList.length} )
                    </h1>
                    {this.state.bookList.map(book => (
                        <div className="cartList" key={book.id}>
                            <div>
                                <img style={{ height: '150px', width: '120px' }} src={book.picPath} alt="" />
                            </div>
                            <div>
                                <h4 style={{ height: "0px" }}>{book.nameOfBook}</h4>
                                <h5 style={{ height: "0px", opacity: '0.5' }}>By {book.author}</h5>
                                <h4 style={{ height: "0px" }}>Rs. {book.price}</h4></div>
                            <span>
                                <button style={{ borderRadius: '25px' }} onClick={() => this.handleChangeBookDec(book)}>-</button>
                                <input style={{ margin: "5px", width: "15px", textAlign: 'center', fontWeight: 'bold' }} readOnly value={book.bookQuantity}></input>
                                <button style={{ borderRadius: '25px' }} onClick={() => this.handleChangeBookInc(book)} >+</button>
                            </span>
                            <div>
                                <button onClick={() => this.handleAddToWishlist(book.id)} style={{ backgroundColor: 'brown', color: 'white', width: '150px', height: '30px' }}>MOVE TO WISHLIST</button>
                                <button onClick={() => this.handleChangeBookRemove(book.id)} style={{ fontFamily: "fontawesome", width: '100px', height: '30px', marginLeft: '3.5px' }}>REMOVE</button>
                            </div>
                        </div>
                    ))}
                    <div className="purchaseButton" >
                        <button onClick={this.toggleDetailsView} style={{ height: "30px", width: "200px", backgroundColor: "rgb(114, 134, 189)", color: "white", fontSize: "25px" }}> PLACE ORDER </button>
                    </div>
                </div>
                    <div  style={this.state.detailsEnabled===true ? {display:"flex"} : {display:"none"}}>
                        <CustomerDetails toggleDetailsView={this.toggleDetailsView}/>
                    </div>
            </div>
        );
    }
}