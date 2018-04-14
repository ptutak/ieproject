import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import BookView from "./BookView";
import BookEdit from "./BookEdit";
import requestJSON from '../services/requestJSON';

class Book extends Component {

    constructor(props){
        super(props);
        this.state={
            editable:false,
            book:this.props.book,
            newBook:null
        };
        this.renderMain=this.renderMain.bind(this);
        this.renderButtonEditUpdate=this.renderButtonEditUpdate.bind(this);
        this.handleEditClick=this.handleEditClick.bind(this);
        this.handleUpdateClick=this.handleUpdateClick.bind(this);
        this.handleDeleteClick=this.handleDeleteClick.bind(this);
        this.setNewBook=this.setNewBook.bind(this);
    }

    handleEditClick(event){
        this.setState({editable:true});
        event.preventDefault();
    }

    handleUpdateClick(event){
        if (this.state.newBook) {
            requestJSON('/books/'+this.state.book.id,'PUT',JSON.stringify(this.state.newBook))
                .then(()=>{return requestJSON('/books/'+this.state.book.id)}
                )
                .then((response)=>{return response.json()})
                .then((book)=>{
                    if (this.state.book.authors[0]!==this.state.newBook.authors[0]){
                        requestJSON('/authors/'+this.state.book.authors[0])
                            .then((response)=>{return response.json()})
                            .then((author)=>{
                                let ind=author.books.indexOf(this.state.book.id);
                                if (ind>-1)
                                    author.books.splice(ind,1);
                                requestJSON('/authors/'+author.id,'PUT',JSON.stringify(author))});
                        requestJSON('/authors/'+book.authors[0])
                            .then((response)=>{return response.json()})
                            .then((author)=>{
                                author.books.push(book.id);
                                requestJSON('/authors/'+author.id,'PUT',JSON.stringify(author))});
                    }
                    this.setState({book:book});
                })
                .then(()=>{
                    this.setState({editable:false});
                    this.forceUpdate();
                });
        }
        event.preventDefault();
    }

    handleDeleteClick(event){
        event.preventDefault();
        fetch('http://localhost:3001/books/'+this.state.book.id,{
            method:'DELETE',
            body:JSON.stringify(this.state.book.id)
        })
            .then(()=>{
                requestJSON('/authors/'+this.state.book.authors[0])
                    .then((response)=>{return response.json()})
                    .then((author)=>{
                        let ind=author.books.indexOf(this.state.book.id);
                        if (ind>-1)
                            author.books.splice(ind,1);
                        requestJSON('/authors/'+author.id,'PUT',JSON.stringify(author))});
            })
            .then(()=>{this.props.refreshOnDelete()});
    }

    setNewBook(book){
        this.setState({newBook:book})
    }

    renderButtonEditUpdate(){
        if (this.state.editable){
            return(
            <Button onClick={this.handleUpdateClick}>
                Update
            </Button>
            );
        }
        return (
            <Button onClick={this.handleEditClick}>
                Edit
            </Button>
        );
    }


    renderMain(){
        if (this.state.editable){
            return (
                <BookEdit book={this.state.book} setNewBook={this.setNewBook}/>
            );
        }
        return (
            <BookView book={this.state.book}/>
        )
    }

    render() {
        return (
            <div>
                {this.renderMain()}
                <div>
                    <span style={{paddingRight:'100px'}}>
                        {this.renderButtonEditUpdate()}
                    </span>
                    <span>
                        <Button onClick={this.handleDeleteClick}>
                            Delete
                        </Button>
                    </span>
                </div>
            </div>
        )
    }
}

export default Book;