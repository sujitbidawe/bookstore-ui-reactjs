import React, { Component } from "react";
import BookData from './BookDataLayer';
import CustomerDetails from './Customerdetails';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

var bookData = new BookData();

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            bookList: [],
            detailsEnabled: false,
            detailsVisibility: { display: 'none' },
        }
    }

    async componentDidMount() {
        await bookData.getAllCartBook(response => {
            this.setState({
                bookList: response,
                bookCount: response.length
            })
        });
        await bookData.getAllCartBook(response => {
            this.props.dispatch({ type: "cartUpdate", payload: response.length })
        })
        await bookData.getAllWishlistBook(response => {
            this.props.dispatch({ type: "wishListUpdate", payload: response.length })
        })
    }

    async handleChangeBookRemove(e) {
        await bookData.removeFromCart(e, 1)
        await bookData.getAllCartBook(response => {
            this.setState({
                bookList: response
            })
        });
        // console.log("remove book", this.state.bookList.length)
        this.props.dispatch({ type: "cartUpdate", payload: this.state.bookList.length })
    }

    async handleChangeBookDec(e) {
        let q = e.bookQuantity - 1;
        // console.log("bookLength from cart",this.state.bookList.length)
        await bookData.updateCart(e.id, q)
        await bookData.getAllCartBook(response => {
            this.setState({
                bookList: response
            })
        })
        this.props.dispatch({ type: "cartUpdate", payload: this.state.bookList.length })
    }

    async handleChangeBookInc(e) {
        let q = e.bookQuantity + 1;
        await bookData.updateCart(e.id, q)
        await bookData.getAllCartBook(response => {
            this.setState({
                bookList: response
            })
        })
        this.props.dispatch({ type: "cartUpdate", payload: this.state.bookList.length })
    }

    toggleDetailsView = async () => {
        await this.setState({
            detailsEnabled: true,
            detailsVisibility: { display: 'flex' }

        })
    }

    render() {
        this.props.dispatch({ type: "cartUpdate", payload: this.state.bookList.length });
        return (
            localStorage.getItem("token") != null ?
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
                                <button onClick={() => this.handleChangeBookRemove(book.id)} style={{ fontFamily: "fontawesome", width: '100px', height: '30px', marginLeft: '3.5px' }}>REMOVE</button>
                            </div>
                        </div>
                    ))}
                    <div className="purchaseButton" >
                        <button onClick={this.toggleDetailsView} style={{ height: "30px", width: "200px", backgroundColor: "rgb(114, 134, 189)", color: "white", fontSize: "25px" }}> PLACE ORDER </button>
                    </div>
                </div>
                <div style={this.state.detailsEnabled === true ? { display: "flex" } : { display: "none" }}>
                    <CustomerDetails toggleDetailsView={this.toggleDetailsView} />
                </div>
            </div>
            :  <Redirect to='/signin' />
        );
    }
}

const mapStateToProps = (state) => ({
    cartCount: state.cartCount
});

export default connect(mapStateToProps)(Cart);