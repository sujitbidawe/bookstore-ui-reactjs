import React, { Component } from "react";
import BookData from './BookDataLayer';
import { connect } from 'react-redux';
import variables from '../App.scss';

var bookData = new BookData();
const CSS = {
    primarycolor: variables.primarycolor,
    secondarycolor: variables.secondarycolor,
    tertiarycolor: variables.tertiarycolor,
    quaternarycolor: variables.quaternarycolor
}

class Home extends Component {
    constructor() {
        super()
        this.state = {
            bookList: [],
            totalPages: '',
            whichData: 'allBooksData',
            pageNumber: 0,
            searchTextHome: ''
        }
    }

    async componentDidMount() {
        await bookData.getAllBook(0, response => {
            this.setState({
                bookList: response.content,
                totalPages: response.totalPages,
                totalElements: response.totalElements
            })
        });
        await bookData.getAllCartBook(response => {
            this.props.dispatch({ type: "cartUpdate", payload: response.length })
        })
        await bookData.getAllWishlistBook(response => {
            this.props.dispatch({ type: "wishListUpdate", payload: response.length })
        })
    }

    handleClickAddToCart = async (e) => {
        await bookData.addToCart(e, 1)
        await bookData.getAllCartBook(response => {
            this.props.dispatch({ type: "cartUpdate", payload: response.length })
        })
    }

    handleClickAddToWishlist = async (e) => {
        await bookData.addToWishlist(e)
        await bookData.getAllWishlistBook(response => {
            this.props.dispatch({ type: "wishListUpdate", payload: response.length })
        })
    }

    handleSort = async (e) => {
        if (e.target.value === "price: high to low") {
            await this.setState({
                whichData: e.target.value,
                pageNumber: 0
            })
        }
        else if (e.target.value === "price: low to high") {
            await this.setState({
                whichData: e.target.value,
                pageNumber: 0
            })
        }
        else {
            await this.setState({
                whichData: "allBooksData",
                pageNumber: 0
            })
        }
        await this.handleChangePage(this.state.pageNumber)
    }

    handleChangePage = async (e) => {
        if (e !== 0) {
            await this.setState({
                pageNumber: e.target.value
            })
        }
        if (this.state.whichData === "price: high to low") {
            await bookData.getAllBookDesc(this.state.pageNumber, response => {
                this.setState({
                    bookList: response.content,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements
                })
            })
        }
        else if (this.state.whichData === "price: low to high") {
            await bookData.getAllBookAsc(this.state.pageNumber, response => {
                this.setState({
                    bookList: response.content,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements
                })
            })
        }
        else if (this.state.whichData === "allBooksData") {
            await bookData.getAllBook(this.state.pageNumber, response => {
                this.setState({
                    bookList: response.content,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements
                })
            })
        }
        else if (this.state.whichData === "searchData") {
            await bookData.getAllSearchBook(this.state.searchTextHome, this.state.pageNumber, response => {
                this.props.dispatch({ type: "searchUpdate", payload: '' })
                this.setState({
                    bookList: response.content,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements
                })
            })

        }
    }

    handleSearchtext = async () => {
        await this.setState({
            whichData: "searchData",
            pageNumber: 0
        })
        await this.handleChangePage(this.state.pageNumber)
    }

    render() {
        if (this.props.searchText !== undefined && this.props.searchText !== '') {
            this.setState({
                searchTextHome: this.props.searchText
            })
            if (this.state.searchTextHome !== undefined && this.state.searchTextHome !== '') {
                this.handleSearchtext()
            }
            this.props.dispatch({ type: "searchUpdate", payload: '' })
        }
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
                            <img style={{ height: '150px', width: '120px', marginTop: "5px", backgroundColor: "grey" }} src={book.picPath} alt="" />
                            <h4 style={{ height: "0px", justifySelf: "center", textAlign: "center" }}>{book.nameOfBook}</h4>
                            <h5 style={{ height: "0px", color: "grey" }}>By {book.author}</h5>
                            <h4 style={{ height: "0px" }}>Rs. {book.price}</h4>
                            <div style={{ padding: "2px" }}>
                                <button onClick={() => this.handleClickAddToCart(book.id)} style={{ backgroundColor: 'brown', color: 'white', width: '110px', height: '25px' }}>ADD TO CART</button>
                                <button onClick={() => this.handleClickAddToWishlist(book.id)} style={{ fontFamily: "fontawesome", width: '100px', height: '25px', marginLeft: '3.5px' }}>&#xf08A; WISHLIST</button>
                            </div>
                            <div className="bookInfo">
                                <p style={{ padding: '13px' }}>{book.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="pagination" >
                        <button className="page-button-view1" value={0} onClick={this.handleChangePage}>First</button>
                        {this.state.pageNumber < 1 ? null :
                            <button className="page-button-view1" value={parseInt(this.state.pageNumber) - 1} onClick={this.handleChangePage} >Previous</button>}
                        {Array.from({ length: this.state.totalPages }, (v, k) => k + 1).map((index) =>
                            <button className="page-button-view" value={index - 1} onClick={(e) => this.handleChangePage(e)}>{index}</button>
                        )}
                        {this.state.pageNumber < this.state.totalPages - 1 ?
                            <button className="page-button-view1" value={parseInt(this.state.pageNumber) + 1} onClick={this.handleChangePage}>Next</button> : null}
                        <button className="page-button-view1" value={this.state.totalPages - 1} onClick={this.handleChangePage}>Last</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cartCount: state.cartCount,
    wishListCount: state.wishListCount,
    searchText: state.searchText
});

export default connect(mapStateToProps)(Home);