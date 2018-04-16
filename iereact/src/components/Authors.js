import React, {Component} from 'react';
import Author from './Author';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import requestJSON from '../services/requestJSON';
export default class Authors extends Component{
    constructor(props){
        super(props);
        this.state={authors:null};
        this.getAuthors=this.getAuthors.bind(this);
        this.getAuthors();
        this.renderAuthors=this.renderAuthors.bind(this);
    }

    getAuthors(){
        requestJSON('/authors/')
            .then((response)=>{return response.json()})
            .then((data)=>{
                this.setState({authors:data})
            })
            .then(()=>{this.forceUpdate();});
    }

    renderAuthors(){
        if (this.state.authors){
            return this.state.authors.map((author, index)=>{
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


