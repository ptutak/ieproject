import React, { Component } from 'react';

export default class Book extends Component {
    render() {
        return (
            <img src={this.props.image} />
        )
    }

}