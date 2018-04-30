import React, {Component} from 'react';
import requestJSON from '../services/requestJSON';
import {Button, Table, ListGroup, ListGroupItem, Image,Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            profile:null,
            newPass:'',
            repNewPass:'',
            nameEdit:false,
            passChange:false,
            picEdit:false
        };
        this.getProfile=this.getProfile.bind(this);
        this.getProfile();
        this.renderProfile=this.renderProfile.bind(this);
        this.renderName=this.renderName.bind(this);
        this.renderPassword=this.renderPassword.bind(this);
        this.renderPicture=this.renderPicture.bind(this);

        this.handleEditName=this.handleEditName.bind(this);
        this.getEditNameValidState=this.getEditNameValidState.bind(this);
        this.handleEditNameChange=this.handleEditNameChange.bind(this);
        this.handleUpdateName=this.handleUpdateName.bind(this);

        this.handleChangePassword=this.handleChangePassword.bind(this);
        this.getNewPassValidState=this.getNewPassValidState.bind(this);
        this.getRepPassValidState=this.getRepPassValidState.bind(this);
        this.handleNewPassChange=this.handleNewPassChange.bind(this);
        this.handleRepPassChange=this.handleRepPassChange.bind(this);
        this.handleUpdatePassword=this.handleUpdatePassword.bind(this);

    }

    getProfile(){
        requestJSON('/users/me?token='+this.props.credentials.token)
            .then((response)=> response.json())
            .then((body)=>{
                this.setState({profile:body})
            })
    }

    handleEditName(event){
        event.preventDefault();
        this.setState({nameEdit:true})
    }

    getEditNameValidState(){
        return null;
    }

    handleEditNameChange(event){
        let profile=this.state.profile;
        profile.name=event.target.value;
        this.setState({profile:profile});
        event.preventDefault();

    }

    handleUpdateName(event){
        this.setState({nameEdit:false});
        event.preventDefault();
    }

    renderName(){
        if (!this.state.nameEdit)
            return (
                <ListGroupItem>
                    Name: {this.state.profile.name}
                    <Button style={{position:'absolute', right:'100px', bottom:'3px' }} onClick={this.handleEditName}>Edit Name</Button>
                </ListGroupItem>
            );

        return (
            <ListGroupItem>
                <Form>
                    <FormGroup controlId='nameInput' validationState={this.getEditNameValidState()}>
                        <ControlLabel>Name:</ControlLabel>
                        <FormControl type='text' value={this.state.profile.name} onChange={this.handleEditNameChange}/>
                    </FormGroup>
                    <Button type='submit' onClick={this.handleUpdateName}>Update Name</Button>
                </Form>
            </ListGroupItem>
        )
    }

    handleChangePassword(event){
        this.setState({passChange:true});
        event.preventDefault();
    }

    getNewPassValidState(){
        if (this.state.newPass.length>=6)
            return null;
        return 'error';
    }

    getRepPassValidState(){
        if(this.state.newPass===this.state.repNewPass)
            return null;
        return 'error';
    }

    handleNewPassChange(event){
        this.setState({newPass:event.target.value});
        event.preventDefault();
    }

    handleRepPassChange(event){
        this.setState({repNewPass:event.target.value});
        event.preventDefault();
    }

    handleUpdatePassword(event){
        
        this.setState({passChange:false});
        event.preventDefault();
    }

    renderPassword(){
        if (!this.state.passChange)
            return (
                <ListGroupItem>
                    <Button onClick={this.handleChangePassword}>Change Password</Button>
                </ListGroupItem>
            );
        return (
            <ListGroupItem>
                <Form inline>
                    <FormGroup style={{paddingRight:'20px'}} controlId='newPassword' validationState={this.getNewPassValidState()}>
                        <ControlLabel>New Password:</ControlLabel>
                        <FormControl type='password' value={this.state.newPass} placeholder={'New Password'} onChange={this.handleNewPassChange}/>
                    </FormGroup>
                    <FormGroup style={{paddingRight:'20px'}} controlId={'repeatPassword'} validationState={this.getRepPassValidState()}>
                        <ControlLabel>Repeat Password:</ControlLabel>
                        <FormControl type={'password'} value={this.state.repNewPass} placeholder={'Repeated Password'} onChange={this.handleRepPassChange}/>
                    </FormGroup>
                    <Button type={'submit'} onClick={this.handleUpdatePassword}>Update Password</Button>
                </Form>
            </ListGroupItem>
        )
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