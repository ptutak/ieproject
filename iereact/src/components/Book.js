import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import BookView from "./BookView";
import BookEdit from "./BookEdit";
import requestJSON from '../services/requestJSON';

let difference = function(setA,setB) {
    let difference = new Set(setA);
    for (let elem of setB) {
        difference.delete(elem);
    }
    return difference;
};

class Book extends Component {

    constructor(props){
        super(props);
        this.state={
            editable:false,
            book:this.props.book,
            newBook:null
        };
        this.renderMain=this.renderMain.bind(this);
        this.renderButtons=this.renderButtons.bind(this);
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
            let set=new Set(this.state.newBook.authors);
            let newBook=this.state.newBook;
            newBook.authors=Array.from(set);
            newBook.token=this.props.credentials.token;
            this.setState({newBook:newBook},()=>{
                requestJSON('/books/'+this.state.book.id,'PUT',JSON.stringify(
                    this.state.newBook
                ))
                    .then((response)=>{return response.json()})
                    .then((book)=>{
                        let authorsToRemove=difference(this.state.book.authors,this.state.newBook.authors);
                        let authorsToAdd=difference(this.state.newBook.authors,this.state.book.authors);
                        for(let author of authorsToAdd){
                            requestJSON('/authors/add/book/' + author.toString()+'/'+book.id.toString()+'?token='+this.props.credentials.token);
                        }
                        for(let author of authorsToRemove){
                            requestJSON('/authors/remove/book/' + author.toString()+'/'+book.id.toString()+'?token='+this.props.credentials.token);
                        }
                        this.setState({book:book});
                    })
                    .then(()=>{
                        this.setState({editable:false});
                        this.forceUpdate();
                    });
            });
        }
        else {
            this.setState({editable:false});
        }
        event.preventDefault();
    }

    handleDeleteClick(event){
        event.preventDefault();
        requestJSON('/books/'+this.state.book.id+'?token='+this.props.credentials.token,'DELETE')
            .then(()=>{
                for (let author of this.state.book.authors){
                    requestJSON('/authors/remove/book/' + author.toString()+'/'+this.state.book.id.toString()+'?token='+this.props.credentials.token);
                }
            })
            .then(()=>{this.props.refreshOnDelete()});
    }

    setNewBook(book){
        this.setState({newBook:book})
    }

    renderButtons(){
        if (this.props.editable) {
            if (this.state.editable) {
                return (
                    <div>
                    <span style={{paddingRight:'100px'}}>
                        <Button onClick={this.handleUpdateClick}>
                            Update
                        </Button>
                    </span>
                    <span>
                        <Button onClick={this.handleDeleteClick}>
                            Delete
                        </Button>
                    </span>
                    </div>
                );
            }
            return (
                <div>
                <span style={{paddingRight:'100px'}}>
                    <Button onClick={this.handleEditClick}>
                        Edit
                    </Button>
                </span>
                <span>
                    <Button onClick={this.handleDeleteClick}>
                        Delete
                    </Button>
                </span>
                </div>
            );
        }
        else
            return null;
    }


    renderMain(){
        if (this.state.editable){
            return (
                <BookEdit book={this.state.book} credentials={this.props.credentials} setNewBook={this.setNewBook}/>
            );
        }
        return (
            <BookView book={this.state.book} credentials={this.props.credentials}/>
        )
    }

    render() {
        return (
            <div>
                {this.renderMain()}
                {this.renderButtons()}
            </div>
        )
    }
}

export default Book;