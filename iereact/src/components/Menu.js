import React, { Component } from 'react';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

class Menu extends Component {
    changeMainSite(e){
        this.props.changeMain("AddAuthor");
        e.target()
    }

    render(){
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                            <a href="#home" onClick={this.changeMainSite.bind(this)}>Library</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown eventKey={3} title="Authors" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Add author</MenuItem>
                            <MenuItem eventKey={3.2}>List of authors</MenuItem>
                        </NavDropdown>
                        <NavDropdown eventKey={3} title="Books" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Add book</MenuItem>
                            <MenuItem eventKey={3.2}>List of books</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1}>
                            Sign Up
                        </NavItem>
                        <NavItem eventKey={2}>
                            Login
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Menu;