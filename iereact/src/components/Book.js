import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import BookView from "./BookView";
import BookEdit from "./BookEdit";

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
        this.setNewBook=this.setNewBook.bind(this);
    }

    handleEditClick(event){
        this.setState({editable:true});
        event.preventDefault();
    }

    handleUpdateClick(event){
        if (this.state.newBook) {
            fetch('http://localhost:3001/books/'+this.state.book.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.newBook)
            }).then((response) => {
                console.log(response);
                fetch('http://localhost:3001/books/'+this.state.book.id).then((response)=>{return response.json()}).then((data)=>{
                    console.log(data);
                    this.setState({book:data});
                }).then(()=> {
                        this.setState({editable: false});
                    }
                );
            });

        }

        event.preventDefault();
    }

    setNewBook(book){
        this.setState({newBook:book})
    }

    renderButtonEditUpdate(){
        if (this.state.editable){
            return <Button onClick={this.handleUpdateClick}>
                Update
            </Button>
        }
        return <Button onClick={this.handleEditClick}>
            Edit
        </Button>
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
                        <Button>
                            Delete
                        </Button>
                </span>
                </div>
            </div>

        )
    }

}

export default Book;