import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NewPassword extends Component {
    render() {
        return (
            <div className="login-box">
                <h1>Welcome to BookStore</h1>
                <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                    <input style={{ padding: "10px", margin: "5px", width: "200px" }} placeholder="enter new password"></input>
                    <input style={{ padding: "10px", margin: "5px", width: "200px" }} placeholder="confirm new password"></input>
                </div>
                <div>
                    <Link to='/signin'>
                        <button className="button">Submit</button>
                    </Link>
                </div>
            </div>
        )
    }
}