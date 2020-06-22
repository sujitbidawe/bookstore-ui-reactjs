import React, { Component } from "react";
import BookData from './BookDataLayer';
import { connect } from 'react-redux';

var bookData = new BookData();

class WishList extends Component {
    constructor() {
        super()
        this.state = {
            bookList: [],
            cartBookCount: 0
        }
    }

    async componentDidMount() {
        await bookData.getAllWishlistBook(response => {
            this.setState({
                bookList: response
            })
        });
        this.props.dispatch({ type: "wishListUpdate", payload: this.state.bookList.length });
        // console.log(this.state.bookList);
    }

    handleClickAddToCart = async (e) => {
        await bookData.addToCart(101, e, 1)
        await bookData.removeFromWishList(101, e)
        await bookData.getAllWishlistBook(response => {
            this.setState({
                bookList: response
            })
        })
        this.props.dispatch({ type: "wishListUpdate", payload: this.state.bookList.length });
        await bookData.getAllCartBook(response => {
            this.setState({
                cartBookCount: response.length
            })
        })
        this.props.dispatch({ type: "methodCalled", payload: this.state.cartBookCount });
        // window.location.reload(true)
    }

    handleRemoveFromWishList = async (e) => {
        await bookData.removeFromWishList(101, e)
        await bookData.getAllWishlistBook(response => {
            this.setState({
                bookList: response
            })
        })
        this.props.dispatch({ type: "wishListUpdate", payload: this.state.bookList.length });
        // window.location.reload(true)
    }

    render() {
        this.props.dispatch({ type: "wishListUpdate", payload: this.state.bookList.length });
        return (
            <div className="wishList">
                <h1 style={{ color: "brown" }}>
                    WishList({this.state.bookList.length})
                </h1>
                {this.state.bookList.map(book => (
                    <div className="bookWish" key={book.id}>
                        <div>
                            <img style={{ height: '150px', width: '120px' }} src={book.picPath} alt="" />
                        </div>
                        <div>
                            <h4 style={{ height: "0px" }}>{book.nameOfBook}</h4>
                            <h5 style={{ height: "0px", opacity: '0.5' }}>By {book.author}</h5>
                            <h4 style={{ height: "0px" }}>Rs. {book.price}</h4></div>
                        <div>
                            <button onClick={() => this.handleClickAddToCart(book.id)} style={{ backgroundColor: 'brown', color: 'white', width: '110px', height: '25px' }}>ADD TO CART</button>
                            <button onClick={() => this.handleRemoveFromWishList(book.id)} style={{ fontFamily: "fontawesome", width: '100px', height: '25px', marginLeft: '3.5px' }}>&#xf08A; REMOVE</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    wishListCount: state.wishListCount
});

export default connect(mapStateToProps) (WishList);