import React, { Component } from 'react';
import Book from './Book';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class Books extends Component {

    constructor(props){
        super(props);
        this.state={books:null};
        this.getBooks=this.getBooks.bind(this);
        this.getBooks();
    }

    getBooks(){
        fetch('http://localhost:3001/books/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>{return response.json()}).then((data)=>{
            let books=data.map((book,index)=>{
                return <ListGroupItem key={index}><Book book={book}/></ListGroupItem>
            });
            this.setState({books:books});
        })
    }

    render() {
        return(
            <div>
                <ListGroup>
                    {this.state.books}
                </ListGroup>
            </div>
        )
    }
}

export default Books;
