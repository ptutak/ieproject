import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import BookView from "./BookView";
import EditBook from "./EditBook";

class Book extends Component {

    constructor(props){
        super(props);
        this.state={
            editable:false,
            book:this.props.book,
            author:null
        };
        this.renderMain=this.renderMain.bind(this);
        this.renderButtonEditUpdate=this.renderButtonEditUpdate.bind(this);
        this.handleEditClick=this.handleEditClick.bind(this);
        this.handleUpdateClick=this.handleUpdateClick.bind(this);
    }

    renderMain(){
        if (this.state.editable){

            return (
                <EditBook book={this.state.book}/>
            );
        }
        return (
            <BookView book={this.state.book}/>
        )
    }
    handleEditClick(event){
        this.setState({editable:true});
        event.preventDefault();
    }

    handleUpdateClick(event){
        this.setState({editable:false});
        event.preventDefault();
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