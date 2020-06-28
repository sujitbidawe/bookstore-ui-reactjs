import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import BookData from './BookDataLayer';

var bookData = new BookData();

export default class NewPassword extends Component {
    constructor() {
        super()
        this.state = {
            password: '',
            confirmPassword: '',
            toggle: '',
            confirmToggle: ''
        }
    }

    async componentDidMount() {
        var currentUrl = window.location.href;
        console.log(currentUrl)
        var token = currentUrl.slice(34)
        await console.log(token)
        localStorage.setItem("token", token)
    }

    handleSetNewPassword = async (e) => {
        await this.setState({
            password: e.target.value
        })
        console.log(this.state.password)
    }

    handleSetConfirmPassword = async (e) => {
        await this.setState({
            confirmPassword: e.target.value
        })
        console.log(this.state.confirmPassword)
    }

    handleSubmitPassoword = async() => {
        if (this.state.password === this.state.confirmPassword) {
           await bookData.setNewPassword(this.state.password)
            await this.setState({
                confirmToggle: true
            })
            localStorage.removeItem("token");
        }
        else {
            await this.setState({
                toggle: true
            })
            window.location.reload(true)
        }
    }

    render() {
        return (
            <div className="login-box">
                <h1>Welcome to BookStore</h1>
                <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                    <input style={{ padding: "10px", margin: "5px", width: "200px" }} placeholder="enter new password" onChange={(e) => this.handleSetNewPassword(e)}></input>
                    <input style={{ padding: "10px", margin: "5px", width: "200px" }} placeholder="confirm new password" onChange={(e) => this.handleSetConfirmPassword(e)}></input>
                </div>
                <div>
                <div>
                    {this.state.confirmToggle ? 
                    <Redirect to='/signin'/>
                    : <button className="button" onClick={this.handleSubmitPassoword}>Submit</button>}
                </div>
                {this.state.toggle ?
                    window.alert("Your password and confirmation password do not match!! Please try again.")
                : null }
                </div>
            </div>
        )
    }
}