import React, { Component } from "react";

export default class OrderConfirm extends Component {

    render() {
        return (
            <div className="OrderConfirm">
                <div><h2>
                    Order Placed Successfully!
                </h2>
                </div>
                <p>Hurray! Your order is confirmed.</p>
                <p>The order ID is #123456, save the order ID</p>
                <p>for further communication.</p>
                <table style={{width:"60%", border:"1px groove grey"}}>
                    <tr >
                        <th >Email us</th>
                        <th >Contact us</th>
                        <th >Address</th>
                    </tr>
                    <tr>
                        <td style={{border:"1px groove grey"}}>test@mail.com</td>
                        <td style={{border:"1px groove grey"}}>0009990000</td>
                        <td style={{border:"1px groove grey"}}>Chembure, Mumbai</td>
                    </tr>
                </table>
                <div className="continueButton">
                    <button >CONTINUE SHOPPING </button>
                </div>
            </div>
        )
    }
}