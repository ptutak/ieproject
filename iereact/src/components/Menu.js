import React, { Component } from 'react';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import requestJSON from '../services/requestJSON';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state={
            role:null
        };
        this.changeMainSite=this.changeMainSite.bind(this);
        this.renderMenuNavs=this.renderMenuNavs.bind(this);
        this.renderLoginRegisterLogout=this.renderLoginRegisterLogout.bind(this);
        this.getRole=this.getRole.bind(this);
    }

    changeMainSite(e) {
        this.props.changeMain(e.target.getAttribute("index"));
        e.preventDefault();
    }

    getRole(){
        if (this.props.credentials){
            requestJSON('/users/me?token='+this.props.credentials.token)
                .then((response)=> response.json())
                .then((body)=> {
                    this.setState({role: body.role});
                })
        }
    }

    renderMenuNavs(){
        switch(this.state.role){
            case 'user':
                return (
                    <Nav>
                        <NavDropdown title="Authors" id={'nav-authors'}>
                            <MenuItem index="Authors" onClick={this.changeMainSite}>List</MenuItem>
                        </NavDropdown>
                        <NavDropdown title="Books" id={'nav-books'}>
                            <MenuItem index="Books" onClick={this.changeMainSite}>List</MenuItem>
                        </NavDropdown>
                    </Nav>
                );
            case 'admin':
                return (
                    <Nav>
                        <NavDropdown title="Authors" id={'nav-authors'}>
                            <MenuItem index="Authors" onClick={this.changeMainSite}>List</MenuItem>
                            <MenuItem index="AddAuthor" onClick={this.changeMainSite}>Add author</MenuItem>
                        </NavDropdown>
                        <NavDropdown title="Books" id={'nav-books'}>
                            <MenuItem index="Books" onClick={this.changeMainSite}>List</MenuItem>
                            <MenuItem index="AddBook" onClick={this.changeMainSite}>Add book</MenuItem>
                        </NavDropdown>
                        <NavDropdown title={'Users'} id={'nav-users'}>
                            <MenuItem index={'UserList'} onClick={this.changeMainSite}>User List</MenuItem>
                        </NavDropdown>
                    </Nav>
                );
            default:
                this.getRole();
                return null;
        }
    }

    renderLoginRegisterLogout(){
        if (!this.props.credentials) {
            return (
                <Nav pullRight>
                    <NavItem index="Register" onClick={this.changeMainSite}>
                        Register
                    </NavItem>
                    <NavItem index="Login" onClick={this.changeMainSite}>
                        Login
                    </NavItem>
                </Nav>
            );
        }
        else {
            return (
                    <Nav pullRight>
                        <NavItem index="Profile" onClick={this.changeMainSite}>
                            Profile
                        </NavItem>
                        <NavItem href={"http://localhost:3000/"}>
                            Logout
                        </NavItem>
                    </Nav>
            )
        }
    }

    render(){
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                            <a href="" onClick={this.changeMainSite}>Library</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    {this.renderMenuNavs()}
                    {this.renderLoginRegisterLogout()}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Menu;