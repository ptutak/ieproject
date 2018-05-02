import React, {Component} from 'react';
import requestJSON from '../services/requestJSON';
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import Profile from "./Profile";

export default class UserList extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            myId:''
        };
        this.getUsers=this.getUsers.bind(this);
        this.getUsers();
        requestJSON('/users/me?token='+this.props.credentials.token)
            .then((response)=>{return response.json()})
            .then((me)=>{this.state.myId=me.id});
        this.renderUsers=this.renderUsers.bind(this);
    }

    getUsers(){
        requestJSON('/users/?token='+this.props.credentials.token)
            .then((response)=> {
                if (response.status===401)
                    window.location='http://localhost:3000';
                return response.json();
            })
            .then((body)=>{
                this.setState({users:body});
            })
    }

    deleteUserById(userId){
        return (event)=>{
            if (userId===this.state.myId){
                if (window.confirm('Are you sure you want to delete your own profile?')){
                    requestJSON('/users/'+userId,'DELETE',JSON.stringify({token:this.props.credentials.token}))
                        .then((response)=>{
                            this.getUsers();
                        })
                }
            }
            else {
                requestJSON('/users/' + userId, 'DELETE', JSON.stringify({token: this.props.credentials.token}))
                    .then((response) => {
                        this.getUsers();
                    })
            }
        }
    }

    renderUsers(){
        return this.state.users.map((user,index)=>{
            return <ListGroupItem key={user}>
                <Profile profileId={user} showRole={true} credentials={this.props.credentials}/>
                <Button onClick={this.deleteUserById(user)}>Delete</Button>
            </ListGroupItem>
        })
    }

    render(){
        return (
            <ListGroup>
                {this.renderUsers()}
            </ListGroup>
        )
    }
}