import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class SignIn extends Component {
    render() {
        return (
            <div className="login-box">
                <h1>Welcome to BookStore</h1>
                <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                    <input style={{ padding: "10px", margin: "5px" }} placeholder="Username"></input>
                    <input style={{ padding: "10px", margin: "5px" }} placeholder="Password"></input>
                </div>
                <div>
                    <Link to="/" >
                        <button className="button">Login</button>
                    </Link>
                </div>
                <div style={{ padding: "10px", margin:"5px", display: "flex", flexDirection: "column", fontSize:"20px", justifyContent:"center", alignItems:"center" }}>
                     <a style={{color:"white", textDecoration:"none",  padding: "5px"}} href="/signup">Create account instead!</a>
                     <a style={{color:"white", textDecoration:"none"}} href="/resetpassword">forgot password?</a> 
                </div>
            </div>
        )
    }
}

export default SignIn;