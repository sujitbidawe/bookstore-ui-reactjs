import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class ResetPassword extends Component {
    render() {
        return (
            <div className="login-box">
                <h1>Welcome to BookStore</h1>
                <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                    <input style={{ padding: "10px", margin: "5px", width:"200px" }} placeholder="Email"></input>
                </div>
                <div>
                    <Link >
                        <button className="button">Submit</button>
                    </Link>
                </div>
                <div style={{ padding: "10px", margin:"5px", display: "flex", flexDirection: "column", fontSize:"20px", justifyContent:"center", alignItems:"center" }}>
                     <a style={{color:"white", textDecoration:"none",  padding: "5px"}} href="/signup">Create new account instead!</a>
                     <a style={{color:"white", textDecoration:"none"}} href="/signin">have an acoount? Signin</a> 
                </div>
            </div>
        )
    }
}

export default ResetPassword;