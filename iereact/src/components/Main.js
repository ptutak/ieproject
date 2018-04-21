import React, { Component } from 'react';
import Welcome from './Welcome';
import AddAuthor from './AddAuthor';
import Authors from './Authors';
import AddBook from './AddBook';
import Books from './Books';
import Register from './Register';
import Login from './Login';


class Main extends Component {

    render() {
        switch(this.props.mainSite){
            case "Welcome":
                return <Welcome/>;
            case "AddAuthor":
                return <AddAuthor changeMain={this.props.changeMain}/>;
            case "Authors":
                return <Authors/>;
            case "AddBook":
                return <AddBook changeMain={this.props.changeMain}/>;
            case "Books":
                return <Books/>;
            case "Register":
                return <Register/>;
            case "Login":
                return <Login/>;
            default:
                return <Welcome/>;
        }
    }
}

export default Main;