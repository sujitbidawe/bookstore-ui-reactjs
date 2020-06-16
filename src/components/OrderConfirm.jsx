import React, { Component } from "react";

export default class OrderConfirm extends Component {

    render() {
        return (
            <div className="OrderConfirm">
                <div className="orderPlaced">
                    
                    <h2>
                        Order Placed Successfully!
                    </h2>
                <img src="http://www.pngall.com/wp-content/uploads/1/Celebration-PNG-Transparent-HD-Photo.png">

                </img>
                </div>
                <p>Hurray! Your order is confirmed.</p>
                <p>The order ID is #123456, save the order ID</p>
                <p>for further communication.</p>
                <table style={{width:"60%", border:"0.5px groove grey"}}>
                    <tr >
                        <th >Email us</th>
                        <th >Contact us</th>
                        <th >Address</th>
                    </tr>
                    <tr>
                        <td style={{border:"1px groove grey"}}>test@mail.com</td>
                        <td style={{border:"1px groove grey"}}>0009990000</td>
                        <td style={{border:"1px groove grey"}}>Chembur, Mumbai</td>
                    </tr>
                </table>
                <div className="continueButton">
                    <button >CONTINUE SHOPPING </button>
                </div>
            </div>
        )
    }
}