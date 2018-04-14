import React, {Component} from 'react';
import Author from './Author';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export default class Authors extends Component{
    constructor(props){
        super(props);
        this.state={authors:null};
        this.getAuthors=this.getAuthors.bind(this);
        this.getAuthors();
        this.renderAuthors=this.renderAuthors.bind(this);
    }

    getAuthors(){
        fetch('http://localhost:3001/books/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then((response)=>{return response.json()})
            .then((data)=>{
                this.setState({authors:data});})
            .then(()=>{this.forceUpdate();});
    }

    renderAuthors(){
        if (this.state.allAuthors){
            return this.state.allAuthors.map((author, index)=>{
                return <ListGroupItem key={index}><Author author={author} refreshOnDelete={this.getAuthors}/></ListGroupItem>
            });
        }
    }

    render() {
        return(
            <div>
                <ListGroup>
                    {this.renderAuthors()}
                </ListGroup>
            </div>
        )
    }
}


