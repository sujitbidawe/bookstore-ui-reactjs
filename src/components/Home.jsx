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
        });
    }

    render() {
        return (
            <div >
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", paddingLeft:"100px", paddingRight:"100px", paddingTop:"20px"}}>
                    <h3>
                        Books ({this.state.bookList.length})
                    </h3>
                    <select name="sort" id="sort" style={{height:'40px'}}>
                        <option value="relevance">relevance</option>
                        <option value="price: low to high">price: low to high</option>
                        <option value="price: high to low">price: high to low</option>
                        <option value="newest first">newest first</option>
                    </select>
                </div>
                <div className="bookCompartment">
                    {this.state.bookList.map(book => (
                        <div className="Book" key={book.id}>
                            <img style={{ height: '150px', width: '120px' }} src={book.image} alt="" />
                            <h4 style={{ height: "0px", justifySelf: "center" }}>{book.bookTitle}</h4>
                            <h5 style={{ height: "0px", opacity: '0.5' }}>By {book.authorName}</h5>
                            <h4 style={{ height: "0px" }}>Rs. {book.price}</h4>
                            <div style={{ padding: "2px" }}>
                                <button style={{ backgroundColor: 'brown', color: 'white', width: '110px', height: '25px' }}>ADD TO CART</button>
                                <button style={{ fontFamily: "fontawesome", width: '100px', height: '25px', marginLeft: '3.5px' }}>&#xf08A; WISHLIST</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}