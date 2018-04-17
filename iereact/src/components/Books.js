import React, { Component } from 'react';
import Book from './Book';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import requestJSON from '../services/requestJSON';

class Books extends Component {

    constructor(props){
        super(props);
        this.state={books:[]};
        this.getBooks=this.getBooks.bind(this);
        this.getBooks();
        this.renderBooks=this.renderBooks.bind(this);
    }

    getBooks(){
        requestJSON('/books/')
            .then((response)=>{return response.json()})
            .then((data)=>{
                this.setState({books:data});
            })
            .then(()=>{this.forceUpdate();});
    }

    renderBooks(){
        if (this.state.books){
            return this.state.books.map((book,index)=>{
                return <ListGroupItem key={book.id}><Book book={book} refreshOnDelete={this.getBooks}/></ListGroupItem>
            });
        }
    }

    render() {
        return(
            <div>
                <ListGroup>
                    {this.renderBooks()}
                </ListGroup>
            </div>
        )
    }
}

export default Books;
