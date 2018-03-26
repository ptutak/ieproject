import React, { Component } from 'react';
import Welcome from './Welcome';
import AddAuthor from './AddAuthor';
import Authors from './Authors';
import AddBook from './AddBook';
import Books from './Books';


class Main extends Component {

    render() {
        switch(this.props.mainSite){
            case "Welcome":
                return <Welcome/>;
            case "AddAuthor":
                return <AddAuthor/>;
            case "Authors":
                return <Authors/>;
            case "AddBook":
                return <AddBook/>;
            case "Books":
                return <Books/>;
            default:
                return <Welcome/>;
        }
    }
}

export default Main;