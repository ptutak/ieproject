import React, { Component } from 'react';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

class Menu extends Component {
    changeMainSite(e) {
        this.props.changeMain(e.target.getAttribute("index"));
        console.log(e.target.getAttribute("index"));
    }

    render(){
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                            <a index="Welcome" href="#home" onClick={this.changeMainSite.bind(this)}>Library</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown title="Authors" id="basic-nav-dropdown">
                            <MenuItem index="AddAuthor" onClick={this.changeMainSite.bind(this)}>Add author</MenuItem>
                            <MenuItem index="Authors" onClick={this.changeMainSite.bind(this)}>List of authors</MenuItem>
                        </NavDropdown>
                        <NavDropdown title="Books" id="basic-nav-dropdown">
                            <MenuItem index="AddBook" onClick={this.changeMainSite.bind(this)}>Add book</MenuItem>
                            <MenuItem index="Books" onClick={this.changeMainSite.bind(this)}>List of books</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem index="SignUp">
                            Sign Up
                        </NavItem>
                        <NavItem index="Login">
                            Login
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Menu;