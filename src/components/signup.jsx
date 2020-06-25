import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class SignUp extends Component {
    render() {
        return (
            <div className="login-box">
                <h1>Welcome to BookStore</h1>
                {/* <div >
                    <Link to="/signin" style={{ color: "white", padding: "7px" }}>SignIn </Link>
                    or
                    <Link to="/signup" style={{ color: "white", padding: "7px" }}>SignUp</Link>
                </div> */}
                <div>
                    <h3>
                        Create an account
                    </h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "300px", padding: "10px" }}>
                    <input style={{ padding: "10px", margin: "5px" }} placeholder="Name"></input>
                    <input style={{ padding: "10px", margin: "5px" }} placeholder="Email"></input>
                    <input style={{ padding: "10px", margin: "5px" }} placeholder="Username"></input>
                    <input style={{ padding: "10px", margin: "5px" }} placeholder="Password"></input>
                    <input style={{ padding: "10px", margin: "5px" }} placeholder="Mobile"></input>
                </div>
                <div>
                    <Link to="/signin" >
                        <button className="button">Signup</button>
                    </Link>
                </div>
                <div style={{ padding: "10px", margin: "5px", display: "flex", flexDirection: "row", fontSize: "20px" }}>
                    <a style={{ color: "white", padding: "5px", textDecoration: "none" }} href="/signin">Already have an account? signin!</a>
                </div>
            </div>
        )
    }
}

export default SignUp;
