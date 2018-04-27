import React, {Component} from 'react';
import requestJSON from "../services/requestJSON";
import {Button} from 'react-bootstrap';
import AuthorEdit from './AuthorEdit';
import AuthorView from './AuthorView';

let difference = function(setA,setB) {
    let difference = new Set(setA);
    for (let elem of setB) {
        difference.delete(elem);
    }
    return difference;
};


export default class Author extends Component{
    constructor(props){
        super(props);
        this.state={
            editable:false,
            author:this.props.author,
            newAuthor:null
        };
        this.renderMain=this.renderMain.bind(this);
        this.renderButtons=this.renderButtons.bind(this);
        this.handleEditClick=this.handleEditClick.bind(this);
        this.handleUpdateClick=this.handleUpdateClick.bind(this);
        this.handleDeleteClick=this.handleDeleteClick.bind(this);
        this.setNewAuthor=this.setNewAuthor.bind(this);
    }

    handleEditClick(event){
        this.setState({editable:true});
        event.preventDefault();
    }

    handleUpdateClick(event){
        if (this.state.newAuthor) {
            let set=new Set(this.state.newAuthor.books);
            let newAuthor=this.state.newAuthor;
            newAuthor.books=Array.from(set);
            newAuthor.token=this.props.credentials.token;
            this.setState({newAuthor:newAuthor},()=>{
                requestJSON('/authors/'+this.state.author.id,'PUT',JSON.stringify(this.state.newAuthor))
                    .then((response)=>{return response.json()})
                    .then((author)=>{
                        let booksToRemove=difference(this.state.author.books,this.state.newAuthor.books);
                        let booksToAdd=difference(this.state.newAuthor.books,this.state.author.books);
                        for(let book of booksToAdd){
                            requestJSON('/books/add/author/' + book.toString()+'/'+author.id.toString()+'?token='+this.props.credentials.token);
                        }
                        for(let book of booksToRemove){
                            requestJSON('/books/remove/author/' + book.toString()+'/'+author.id.toString()+'?token='+this.props.credentials.token);
                        }
                        this.setState({author:author});
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
        requestJSON('/authors/'+this.state.author.id+'?token='+this.props.credentials.token,'DELETE')
            .then(()=>{
                for (let book of this.state.author.books){
                    requestJSON('/books/remove/author/' + book.toString()+'/'+this.state.author.id.toString()+'?token='+this.props.credentials.token);
                }
            })
            .then(()=>{this.props.refreshOnDelete()});
    }

    setNewAuthor(author){
        this.setState({newAuthor:author})
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
                <AuthorEdit author={this.state.author} credentials={this.props.credentials} setNewAuthor={this.setNewAuthor}/>
            );
        }
        return (
            <AuthorView author={this.state.author} credentials={this.props.credentials}/>
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
