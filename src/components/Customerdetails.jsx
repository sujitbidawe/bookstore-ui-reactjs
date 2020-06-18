import React, { Component } from "react";
import OrderSummary from './OrderSummary';

export default class CustomerDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            summaryEnabled: false,
            summaryVisibility: { display: 'none' }
        }
    }

    toggleSummaryView = async (e) => {
        e.preventDefault();
        console.log("before click details", this.state.summaryEnabled)
        this.props.toggleDetailsView()
        await this.setState({
            summaryEnabled: !this.state.summaryEnabled,
            summaryVisibility: { display: 'flex' }
        })
        console.log("after click details", this.state.summaryEnabled)
    }

    render() {
        return (
            <div className="customerDetails">
                <div style={{ border: "1px groove grey", marginBottom: "20px", padding:"20px" }}>
                    <form>
                        <div>
                            <h3>Customer Details</h3>
                        </div>
                        <div className="detailsInput">
                            <input style={{ fontSize: "15px" }} required placeholder="Name" ></input>
                            <input style={{ fontSize: "15px", marginLeft: "10px" }} required pattern="^[1-9][0-9]{9}$" placeholder="Phone Number"></input>
                        </div>
                        <div className="detailsInput">
                            <input style={{ fontSize: "15px" }} pattern="^[1-9][0-9]{5}$" size="6" placeholder="Pincode"></input>
                            <input style={{ fontSize: "15px", marginLeft: "10px" }} required placeholder="Locality"></input>
                        </div>
                        <div className="detailsInput">
                            <textarea style={{ fontSize: "15px", height: "80px", width: "350px" }} required placeholder="Address"></textarea>
                        </div>
                        <div className="detailsInput">
                            <input style={{ fontSize: "15px" }} required placeholder="city/town"></input>
                            <input style={{ fontSize: "15px", marginLeft: "10px" }} required placeholder="Landmark"></input>
                        </div>
                        <div className="detailsInput">
                            <text is="3dx">Type: </text>
                            <input type="radio" id="home" name="type" value="home" />
                            <label for="male" >Home</label>
                            <input type="radio" id="work" name="type" value="work" />
                            <label for="female">Work</label>
                            <input type="radio" id="other" name="type" value="other" />
                            <label for="other">Other</label>
                        </div>
                    </form>
                    <div className="purchaseButton" >
                        <button onClick={this.toggleSummaryView} style={{ height: "30px", width: "200px", backgroundColor: "rgb(114, 134, 189)", color: "white", fontSize: "25px" }}> CONTINUE </button>
                    </div>
                </div>
                <div style={this.state.summaryEnabled === true ? { display: "flex" } : { display: "none" }}>

                    <OrderSummary />

                </div>
            </div>

        )
    }
}