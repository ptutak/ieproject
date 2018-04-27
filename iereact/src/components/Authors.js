import React, {Component} from 'react';
import Author from './Author';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import requestJSON from '../services/requestJSON';
export default class Authors extends Component{
    constructor(props){
        super(props);
        this.state={
            authors:[],
            editable:false
        };
        this.getAuthors=this.getAuthors.bind(this);
        this.getAuthors();
        this.renderAuthors=this.renderAuthors.bind(this);
    }

    getAuthors(){
        requestJSON('/authors/?token='+this.props.credentials.token)
            .then((response)=>{return response.json()})
            .then((data)=>{
                this.setState({authors:data})
            })
            .then(()=>{this.forceUpdate();});
        requestJSON('/users/me?token='+this.props.credentials.token)
            .then((response)=>{return response.json()})
            .then((data)=>{
                if (data.role==='admin')
                    this.setState({editable:true})
            })
    }

    renderAuthors(){
        if (this.state.authors){
            return this.state.authors.map((author, index)=>{
                return (
                    <ListGroupItem key={author.id}>
                    <Author
                        author={author}
                        editable={this.state.editable}
                        refreshOnDelete={this.getAuthors}
                        credentials={this.props.credentials}
                    />
                    </ListGroupItem>
                )
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


