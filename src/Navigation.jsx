import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default class Navigation extends Component {
    render() {
        return (
            <div className="NavClass">
                <Navbar bg='dark' expand="lg">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>      
                        <NavLink className="d-inline p-2 bg-dark text-white"
                            to="/">Home </NavLink>
                       
                        <NavLink className="d-inline p-2 bg-dark text-white"
                            to="/cart">Cart </NavLink>
                       
                        <NavLink className="d-inline p-2 bg-dark text-white"
                            to="/About">About</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
                {/* <div class="topnav">
                    <a class="#Home" href="#home" onClick={}>Home  </a>
                    <a href="#Cart">Cart  </a>
                    <a href="#About">About  </a>
                </div> */}
            </div>
        )
    }
} 