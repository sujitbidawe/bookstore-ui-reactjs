import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import BookData from './BookDataLayer';
import variables from '../App.scss';

var bookData = new BookData();
const CSS = {
    primarycolor: variables.primarycolor,
    secondarycolor: variables.secondarycolor,
    tertiarycolor: variables.tertiarycolor,
    quaternarycolor: variables.quaternarycolor
}

export class ResetPassword extends Component {
        constructor(props) {
            super(props)
            this.state = {
                email: '',
            }
        }
    
        handleSetEmail = async (e) => {
            await this.setState({
                email: e.target.value
            })
        }

        handleResetPassword = async () => {
            await bookData.resetPassword(this.state.email)
        }
    
    render() {
        return (
            <div className="login-box">
                <h1>Welcome to BookStore</h1>
                <div style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems:"center" }}>
                    <h4>Trouble logging in?</h4>
                    <input style={{ padding: "10px", margin: "5px", width:"200px" }} placeholder="Email" onChange={(e) => this.handleSetEmail(e)}></input>
                </div>
                <div>
                    <Link >
                        <button className="button" onClick={this.handleResetPassword}>Submit</button>
                    </Link>
                </div>
                <div style={{ padding: "10px", margin:"5px", display: "flex", flexDirection: "column", fontSize:"20px", justifyContent:"center", alignItems:"center" }}>
                     <a style={{color: CSS.secondarycolor, textDecoration:"none",  padding: "5px"}} href="/signup">Create new account instead!</a>
                     <a style={{color: CSS.secondarycolor, textDecoration:"none"}} href="/signin">have an acoount? Signin</a> 
                </div>
            </div>
        )
    }
}

export default ResetPassword;