import React, { Component } from "react";
import BookData from './BookDataLayer';
import { connect } from 'react-redux';

var bookData = new BookData();

class Home extends Component {
    constructor() {
        super()
        this.state = {
            bookList: [],
            cartCount: 0,
            wishCount: 0
        }
    }

    async componentDidMount() {
        await bookData.getAllBooks(response => {
            this.setState({
                bookList: response
            })
        });
    }

    handleClickAddToCart = async (e) => {
        await bookData.addToCart(e, 1)
        await bookData.getAllCartBook(response => {
            this.props.dispatch({ type: "methodCalled", payload: response.length })
        })
    }

    handleClickAddToWishlist = async (e) => {
        await bookData.addToWishlist(e)
        await bookData.getAllWishlistBook(response => {
            this.props.dispatch({ type: "wishListUpdate", payload: response.length })
        })
    }

    handleSort = (e) => {
        if (e.target.value === "price: low to high") {
            bookData.getAllBookAsc(response => {
                this.setState({
                    bookList: response.content
                })
            });
        }
        else if (e.target.value === "price: high to low") {
            bookData.getAllBookDesc(response => {
                this.setState({
                    bookList: response.content
                })
            });
        }
        else {
            bookData.getAllBooks(response => {
                this.setState({
                    bookList: response
                })
            });
        }
    }

    render() {
        return (
            <div >
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: "100px", paddingRight: "100px", paddingTop: "20px" }}>
                    <h3>
                        Books ({this.state.bookList.length})
                    </h3>
                    <select name="sort" id="sort" onChange={this.handleSort} style={{ height: '40px' }}>
                        <option value="relevance">relevance</option>
                        <option value="price: low to high">price: low to high</option>
                        <option value="price: high to low">price: high to low</option>
                        <option value="newest first">newest first</option>
                    </select>
                </div>
                <div className="bookCompartment">
                    {this.state.bookList.map(book => (
                        <div className="Book" key={book.id}>
                            <img style={{ height: '150px', width: '120px', marginTop:"5px", backgroundColor:"grey" }} src={book.picPath} alt="" />
                            <h4 style={{ height: "0px", justifySelf: "center", textAlign: "center" }}>{book.nameOfBook}</h4>
                            <h5 style={{ height: "0px", color:"grey" }}>By {book.author}</h5>
                            <h4 style={{ height: "0px" }}>Rs. {book.price}</h4>
                            <div style={{ padding: "2px" }}>
                                <button onClick={() => this.handleClickAddToCart(book.id)} style={{ backgroundColor: 'brown', color: 'white', width: '110px', height: '25px' }}>ADD TO CART</button>
                                <button onClick={() => this.handleClickAddToWishlist(book.id)} style={{ fontFamily: "fontawesome", width: '100px', height: '25px', marginLeft: '3.5px' }}>&#xf08A; WISHLIST</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cartCount: state.cartCount,
    wishListCount: state.wishListCount
});

export default connect(mapStateToProps)(Home);