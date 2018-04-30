import React, {Component} from 'react';
import requestJSON from '../services/requestJSON';
import {Button, Table, ListGroup, ListGroupItem, Image} from 'react-bootstrap';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            editable:false,
            profile:null,
            nameEdit:false,
            passEdit:false,
            picEdit:false
        };
        this.getProfile=this.getProfile.bind(this);
        this.getProfile();
        this.renderProfile=this.renderProfile.bind(this);
        this.renderName=this.renderName.bind(this);
        this.renderPassword=this.renderPassword.bind(this);
        this.renderPicture=this.renderPicture.bind(this);
    }

    getProfile(){
        requestJSON('/users/me?token='+this.props.credentials.token)
            .then((response)=> response.json())
            .then((body)=>{
                this.setState({profile:body})
            })
    }

    renderName(){
        if (!this.state.nameEdit)
            return <ListGroupItem>
                Name: {this.state.profile.name}
                <Button style={{position:'absolute', right:'100px', bottom:'3px' }}>Edit Name</Button>
            </ListGroupItem>;
        return null;
    }
    renderPassword(){
        if (!this.state.passEdit)
            return <ListGroupItem>
                <Button>Change Password</Button>
            </ListGroupItem>;
        return null;
    }
    renderPicture(){
        if (!this.state.picEdit)
            return <ListGroupItem>
                <Button>Change Picture</Button>
            </ListGroupItem>;
        return null;
    }

    renderProfile(){
        if (this.state.profile){
            return (
                <ListGroup>
                    <ListGroupItem>
                        Email: {this.state.profile.email}
                        <span style={{color:'#808080', position:'absolute', right:'100px' }}>Uneditable</span>
                    </ListGroupItem>
                    {this.renderName()}
                    {this.renderPassword()}
                    {this.renderPicture()}
                </ListGroup>
            )
        }
        return null;
    }
    renderImage(){
        if (this.state.profile){
            return <Image src={this.state.profile.picture} style={{height:'240px'}}/>
        }
        return null;
    }

    render(){
        return(
            <div>
                <Table>
                    <tbody>
                    <tr>
                        <td style={{width:'50%'}}>
                                {this.renderProfile()}
                        </td>
                        <td>
                            {this.renderImage()}
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}