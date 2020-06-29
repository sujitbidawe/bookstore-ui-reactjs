import React, { Component } from "react";
import Order from '../Assets/Order.jpg';
import { Redirect } from 'react-router-dom';
import BookData from "./BookDataLayer";

var bookData = new BookData();

export default class OrderConfirm extends Component {
    constructor() {
        super();
        this.state = {
            orderId: ''
        }
    }

    componentDidMount() {
        bookData.getOrderId(response => {
            console.log("id: ", response)
            this.setState({
                orderId: response
            })
        })
    }

    goToHomepage = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            localStorage.getItem("token") != null ?
            <div className="OrderConfirm">
                <div className="orderPlaced">
                    <img src={Order} alt=""></img>
                </div>
                <text>Hurray! Your order is confirmed.</text>
                <text>The order ID is #{this.state.orderId}, save the order ID</text>
                <text>for further communication.</text>
                <br></br>
                <table style={{ width: "60%", border: "0.5px groove grey" }}>
                    <tr >
                        <th >Email us</th>
                        <th >Contact us</th>
                        <th >Address</th>
                    </tr>
                    <tr>
                        <td style={{ border: "1px groove grey" }}>test@mail.com</td>
                        <td style={{ border: "1px groove grey" }}>0009990000</td>
                        <td style={{ border: "1px groove grey" }}>Chembur, Mumbai</td>
                    </tr>
                </table>
                <div className="continueButton">
                    <button onClick={this.goToHomepage}>CONTINUE SHOPPING </button>
                </div>
            </div>
            :  <Redirect to='/signin' />
        )
    }
}