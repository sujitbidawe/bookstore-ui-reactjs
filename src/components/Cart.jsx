import React, { Component } from "react";
import BookData from './BookDataLayer';
import CustomerDetails from './Customerdetails';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

var bookData = new BookData();

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            bookList: [],
            customerDetailsToggle: false,
            summaryToggle: false,
            name: '',
            pincode: '',
            locality: '',
            address: '',
            city: '',
            landmark: '',
            addressType: '',
            home: false,
            work: false,
            other: false,
            summaryBookList: [],
            orderId: ''
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
        await bookData.getAllCartBook(response => {
            this.setState({
                summaryBookList: response
            })
        });
    }

    async handleChangeBookRemove(e) {
        await bookData.removeFromCart(e, 1)
        await bookData.getAllCartBook(response => {
            this.setState({
                bookList: response
            })
        });
        this.props.dispatch({ type: "cartUpdate", payload: this.state.bookList.length })
    }

    async handleChangeBookDec(e) {
        let q = e.bookQuantity - 1;
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
        await bookData.isCustomerDetailsExisted(response => {
            if (response === 'true') {
                this.setState({
                    customerDetailsToggle: this.state.customerDetailsToggle,
                    summaryToggle: !this.state.summaryToggle
                })
                console.log("qweqwe", this.state.summaryToggle, this.state.customerDetailsToggle)
            } if (response === 'false') {
                this.setState({
                    customerDetailsToggle: !this.state.customerDetailsToggle,
                    summaryToggle: this.state.summaryToggle
                })
            }
        })
        console.log("qweqwe", this.state.summaryToggle, this.state.customerDetailsToggle)
    }

    handleSetName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleSetPincode = (e) => {
        this.setState({
            pincode: e.target.value
        })
    }

    handleSetLocality = async (e) => {
        await this.setState({
            locality: e.target.value
        })
    }

    handleSetAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    handleSetCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    handleSetLandmark = async (e) => {
        await this.setState({
            landmark: e.target.value,
        })
    }

    handleSelectHome = async () => {
        await this.setState({
            work: false,
            home: true,
            other: false
        })
    }

    handleSelectWork = async () => {
        await this.setState({
            work: true,
            home: false,
            other: false
        })
        console.log("work", this.state.work);
    }

    handleSelectOther = async () => {
        await this.setState({
            work: false,
            home: false,
            other: true
        })
        console.log("other", this.state.other);
    }

    toggleSummaryView = async () => {

        if (this.state.home) {
            await this.setState({
                addressType: 'home'
            })
        }
        if (this.state.work) {
            await this.setState({
                addressType: 'work'
            })
        }
        if (this.state.other) {
            await this.setState({
                addressType: 'other'
            })
        }

        console.log("type", this.state.addressType);

        await bookData.addCustomerDetails(this.state.name, this.state.pincode, this.state.locality, this.state.address, this.state.city, this.state.landmark, this.state.addressType)
        await this.setState({
            summaryToggle: true
        })
    }

    async handleChangePlaceOrder() {
        await bookData.placeOrder(response => {
            console.log("order id : ", response)
            window.location.reload(true);
        })
    }

    render() {
        this.props.dispatch({ type: "cartUpdate", payload: this.state.bookList.length });
        return (
            localStorage.getItem("token") != null ?
            <div>
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
                </div>
                <div className="customerDetails">
                    {this.state.customerDetailsToggle ?
                        <div style={{ border: "1px groove grey", marginBottom: "20px", padding: "20px",  }}>
                            <form>
                                <div>
                                    <h3>Customer Details</h3>
                                </div>
                                <div className="detailsInput">
                                    <input style={{ fontSize: "15px" }} required placeholder="Name" onChange={(e) => this.handleSetName(e)}></input>
                                </div>
                                <div className="detailsInput">
                                    <input style={{ fontSize: "15px" }} required pattern="^[1-9][0-9]{5}$" size="6" placeholder="Pincode" onChange={(e) => this.handleSetPincode(e)}></input>
                                    <input style={{ fontSize: "15px", marginLeft: "10px" }} required placeholder="Locality" onChange={(e) => this.handleSetLocality(e)}></input>
                                </div>
                                <div className="detailsInput">
                                    <textarea style={{ fontSize: "15px", height: "80px", width: "350px" }} required placeholder="Address" onChange={(e) => this.handleSetAddress(e)}></textarea>
                                </div>
                                <div className="detailsInput">
                                    <input style={{ fontSize: "15px" }} required placeholder="city/town" onChange={(e) => this.handleSetCity(e)}></input>
                                    <input style={{ fontSize: "15px", marginLeft: "10px" }} required placeholder="Landmark" onChange={(e) => this.handleSetLandmark(e)}></input>
                                </div>
                                <div className="detailsInput">
                                    <text is="3dx">Type: </text>
                                    <input type="radio" id="home" name="type" value="home" onChange={this.handleSelectHome} />
                                    <label for="male" >Home</label>
                                    <input type="radio" id="work" name="type" value="work" onChange={this.handleSelectWork} />
                                    <label for="female">Work</label>
                                    <input type="radio" id="other" name="type" value="other" onChange={this.handleSelectOther} />
                                    <label for="other">Other</label>
                                </div>
                            </form>
                            <div className="purchaseButton" >
                                <button onClick={this.toggleSummaryView} style={{ height: "30px", width: "200px", backgroundColor: "rgb(114, 134, 189)", color: "white", fontSize: "25px" }}> CONTINUE </button>
                            </div>
                        </div> : null}
                </div>
                {this.state.summaryToggle ?
                <div className="OrderSummary">
                <div>
                    <h3 style={{padding:"20px"}}>Order Summary</h3>
                    {this.state.summaryBookList.map(book => (
                        <div className="orderList" key={book.id}>
                            <div>
                                <img style={{ height: '150px', width: '120px' }} src={book.picPath} alt="" />
                            </div>
                            <div>
                                <h4 style={{ height: "0px", marginLeft: "20px" }}>{book.nameOfBook}</h4>
                                <h5 style={{ height: "0px", opacity: '0.5', marginLeft: "20px" }}>By {book.author}</h5>
                                <h4 style={{ height: "0px", marginLeft: "20px" }}>Rs. {book.price}</h4></div>
                        </div>
                    ))}
                </div>

                <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <Link to="/Order" style={{ textDecoration: "none" }}>
                        <button className="checkoutButton" onClick={this.handleChangePlaceOrder}>CHECKOUT </button>
                    </Link>
                    </div> 
            </div> : null}
            </div> 
                : <Redirect to='/signin' onClick={localStorage.setItem("isFrom", "cart")}/>
        );
    }
}

const mapStateToProps = (state) => ({
    cartCount: state.cartCount
});

export default connect(mapStateToProps)(Cart);