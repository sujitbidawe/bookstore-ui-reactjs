import React, { Component } from "react";
import BookData from './BookDataLayer';

var bookData = new BookData();

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            bookList: []
        }
    }

    async componentDidMount() {
        await bookData.getBooks(response => {
            this.setState({
                bookList: response
            })
        } );
    }

    render() {
        return (
            <div className="bookCompartment">
                {this.state.bookList.map(book => (
                    <div className="Book"  key={book.id}>
                        <img style={{ height: '150px', width: '120px' }} src={book.image} alt="" />
                        <h4 style={{ height: "0px", justifySelf:"center"}}>{book.bookTitle}</h4>
                        <h5 style={{ height: "0px", opacity: '0.5' }}>By {book.authorName}</h5>
                        <h4 style={{ height: "0px" }}>Rs. {book.price}</h4>
                        <div style={{padding:"2px"}}>
                            <button style={{ backgroundColor: 'brown', color: 'white', width: '100px', height: '25px' }}>ADD TO CART</button>
                            <button style={{ fontFamily: "fontawesome", width: '100px', height: '25px', marginLeft: '3.5px' }}>&#xf08A; WISHLIST</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}