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
        await bookData.getWishList(response => {
            this.setState({
                bookList: response
            })
        });
        console.log(this.state.bookList);
    }

    render() {
        return (
            <div className="wishList">
                <h1 style={{ color: "brown" }}>
                    Items In wishList
                </h1>
                {this.state.bookList.map(book => (
                    <div className="bookWish" key={book.id}>
                        <div>
                            <img style={{ height: '150px', width: '120px' }} src={book.image} alt="" />
                        </div>
                        <div>
                            <h4 style={{ height: "0px" }}>{book.bookTitle}</h4>
                            <h5 style={{ height: "0px", opacity: '0.5' }}>By {book.authorName}</h5>
                            <h4 style={{ height: "0px" }}>Rs. {book.price}</h4></div>
                        <div>
                            <button style={{ backgroundColor: 'brown', color: 'white', width: '100px', height: '25px' }}>ADD TO CART</button>
                            <button style={{ fontFamily: "fontawesome", width: '100px', height: '25px', marginLeft: '3.5px' }}>&#xf08A; REMOVE</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}