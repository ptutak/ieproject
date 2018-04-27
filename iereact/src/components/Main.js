import React, { Component } from 'react';
import Welcome from './Welcome';
import AddAuthor from './AddAuthor';
import Authors from './Authors';
import AddBook from './AddBook';
import Books from './Books';
import Register from './Register';
import Login from './Login';
import Profile from "./Profile";


class Main extends Component {
    render() {
        switch(this.props.mainSite){
            case "Welcome":
                return <Welcome title={this.props.welcomeTitle}/>;
            case "AddAuthor":
                return <AddAuthor changeMain={this.props.changeMain}
                                  credentials={this.props.credentials}/>;
            case "Authors":
                return <Authors credentials={this.props.credentials}/>;
            case "AddBook":
                return <AddBook changeMain={this.props.changeMain}
                                credentials={this.props.credentials}/>;
            case "Books":
                return <Books credentials={this.props.credentials}/>;
            case "Register":
                return <Register/>;
            case "Login":
                return <Login setCredentials={this.props.setCredentials}
                              changeMain={this.props.changeMain}
                              changeWelcomeTitle={this.props.changeWelcomeTitle}/>;
            case "Profile":
                return <Profile credentials={this.props.credentials}/>;
            default:
                return <Welcome title={this.props.welcomeTitle} />;
        }
    }
}

export default Main;