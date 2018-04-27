import React, { Component } from 'react';
import Book from './Book';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import requestJSON from '../services/requestJSON';

class Books extends Component {

    constructor(props){
        super(props);
        this.state={books:[],editable:false};
        this.getBooks=this.getBooks.bind(this);
        this.getBooks();
        this.renderBooks=this.renderBooks.bind(this);
    }

    getBooks(){
        requestJSON('/books/?token='+this.props.credentials.token,'GET')
            .then((response)=>{return response.json()})
            .then((data)=>{
                this.setState({books:data});
            });
        requestJSON('/users/me?token='+this.props.credentials.token,'GET')
            .then((response)=>{return response.json()})
            .then((body)=>{
                if (body.role==='admin')
                    this.setState({editable:true})
            });
    }

    renderBooks(){
        if (this.state.books){
            return this.state.books.map((book,index)=>{
                return (
                    <ListGroupItem key={book.id}>
                        <Book
                            book={book}
                            credentials={this.props.credentials}
                            editable={this.state.editable}
                            refreshOnDelete={this.getBooks}/>
                    </ListGroupItem>
                )
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
