import React, { Component } from 'react';

class Book extends Component {

    constructor(){
        super();
        this.state={altText:"image"};
    }

    render() {
        return (
            <div>
                <table className="table table-hover table-sm">
                    <tr>
                        <td>
                            <img src={this.props.image} alt={this.state.altText} />
                        </td>
                        <td>
                            Jakiś tekst
                        </td>
                    </tr>
                </table>
            </div>
        )
    }

}

export default Book;