import React, { Component } from "react";
import BookData from './BookDataLayer';

var bookData = new BookData();

export default class About extends Component {
    constructor() {
        super()
        this.state = {
            bookList: []
        }
    }

    async componentDidMount() {
        await bookData.getAllWishlistBook(response => {
            this.setState({
                bookList: response
            })
        });
        console.log(this.state.bookList);
    }

    handleClickAddToCart = (e) => {
        bookData.addToCart(101, e, 1)
        bookData.removeFromWishList(101, e)
        bookData.getAllWishlistBook(response => {
            this.setState({
                bookList: response
            })
        })
        window.location.reload(true)
    }

    handleRemoveFromWishList = (e) => {
        bookData.removeFromWishList(101, e)
        bookData.getAllWishlistBook(response => {
            this.setState({
                bookList: response
            })
        })
        window.location.reload(true)
    }

    render() {
        return (
            <div className="wishList">
                <h1 style={{ color: "brown" }}>
                    My WishList
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