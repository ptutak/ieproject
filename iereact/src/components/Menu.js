import React, { Component } from 'react';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

class Menu extends Component {
    constructor(props){
        super(props);
        this.changeMainSite=this.changeMainSite.bind(this);
    }

    changeMainSite(e) {
        this.props.changeMain(e.target.getAttribute("index"));
    }

    render(){
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                            <a href="#home" onClick={this.changeMainSite}>Library</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown title="Authors" id="basic-nav-dropdown">
                            <MenuItem index="Authors" onClick={this.changeMainSite}>List</MenuItem>
                            <MenuItem index="AddAuthor" onClick={this.changeMainSite}>Add author</MenuItem>
                        </NavDropdown>
                        <NavDropdown title="Books" id="basic-nav-dropdown">
                            <MenuItem index="Books" onClick={this.changeMainSite}>List</MenuItem>
                            <MenuItem index="AddBook" onClick={this.changeMainSite}>Add book</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem index="Register">
                            Register
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