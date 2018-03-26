import React, { Component } from 'react';
import Book from './Book';

class Books extends Component {
    render() {
        let numbers=[1,2,3,4,5];

        numbers=numbers.map((number)=>{return <li>{number}</li>});

        return(
            <div>
                <h1>
                    Books
                </h1>
                <table className="table table-hover table-sm">
                    <ul>
                        {numbers}
                    </ul>
                    <Book/>
                </table>
            </div>
        )
    }
}

export default Books;
