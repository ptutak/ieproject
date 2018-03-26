import React, { Component } from 'react';

class Book extends Component {

    constructor(){
        super();
        this.state={altText:"image"};
    }

    render() {
        return (
                    <tr>
                        <td>
                            <img src={this.props.image} alt={this.state.altText} />
                        </td>
                        <td>
                            Jakiś tekst
                        </td>
                    </tr>

        )
    }

}

export default Book;