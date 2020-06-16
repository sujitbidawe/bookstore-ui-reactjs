import React, { Component } from "react";

export default class CustomerDetails extends Component {

    render() {
        return (
            <div className="customerDetails" id="cust">
                <div>
                    <h3>Customer Details</h3>
                </div>
                <div className="detailsInput">
                    <input style={{ fontSize: "15px" }} placeholder="Name"></input>
                    <input style={{ fontSize: "15px", marginLeft: "10px" }} placeholder="Phone Number"></input>
                </div>
                <div className="detailsInput">
                    <input style={{ fontSize: "15px" }} placeholder="Pincode"></input>
                    <input style={{ fontSize: "15px", marginLeft: "10px" }} placeholder="Locality"></input>
                </div>
                <div className="detailsInput">
                    <input style={{ fontSize: "15px", height: "80px", width: "350px" }} placeholder="Address"></input>
                </div>
                <div className="detailsInput">
                    <input style={{ fontSize: "15px" }} placeholder="city/town"></input>
                    <input style={{ fontSize: "15px", marginLeft: "10px" }} placeholder="Landmark"></input>
                </div>
                <div className="detailsInput">
                    <text is="3dx">Type</text>
                    <input type="radio" id="home" name="type" value="home" />
                    <label for="male" >Home</label>
                    <input type="radio" id="work" name="type" value="work" />
                    <label for="female">Work</label>
                    <input type="radio" id="other" name="type" value="other" />
                    <label for="other">Other</label>
                    <button onClick={this.toggleSummaryView} style={{ backgroundColor: 'rgb(114, 134, 189)', color: 'white', height: "30px", width: "200px", marginLeft: "560px", fontSize: "25px" }}>CONTINUE</button>
                </div>
            </div>
        )
    }
}