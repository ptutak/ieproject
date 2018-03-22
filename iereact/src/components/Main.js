import React, { Component } from 'react';
import Books from './Books';


class Main extends Component {
    render() {
        return (
            <div>
                <h1>
                    {this.props.mainTitle}
                </h1>
                <Books/>
            </div>
        )
    }
}

export default Main;