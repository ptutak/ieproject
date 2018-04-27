import React, {Component} from 'react';
import requestJSON from '../services/requestJSON';
import {Button} from 'react-bootstrap';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            editable:false,
            profile:null
        };
        this.getProfile=this.getProfile.bind(this);
        this.renderProfile=this.renderProfile.bind(this);
        this.renderButtons=this.renderButtons.bind(this);
    }

    getProfile(){
        requestJSON('/users/me?token='+this.props.credentials.token)
            .then((response)=> response.json())
            .then((body)=>{
                this.setState({profile:body})
            })
    }

    renderProfile(){

    }

    renderButtons(){
        if (this.state.editable){
            return <Button>Hello</Button>
        }
    }
    render(){
        return(
            <div>
                {this.renderProfile()}
                {this.renderButtons()}
            </div>
        )
    }
}