import React, {Component} from 'react';
import requestJSON from '../services/requestJSON';
import {Button, Table, ListGroup, ListGroupItem, Image,Form, FormGroup, FormControl, ControlLabel, Radio} from 'react-bootstrap';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            profile:null,
            newPass:'',
            repNewPass:'',
            nameEdit:false,
            passChange:false,
            picEdit:false,
            picValidState:null,
            roleChange:false
        };
        this.getProfile=this.getProfile.bind(this);
        this.getProfile();
        this.renderProfile=this.renderProfile.bind(this);
        this.renderName=this.renderName.bind(this);
        this.renderPassword=this.renderPassword.bind(this);
        this.renderPicture=this.renderPicture.bind(this);
        this.renderRole=this.renderRole.bind(this);

        this.handleEditName=this.handleEditName.bind(this);
        this.getEditNameValidState=this.getEditNameValidState.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleUpdateName=this.handleUpdateName.bind(this);

        this.handleChangePassword=this.handleChangePassword.bind(this);
        this.getNewPassValidState=this.getNewPassValidState.bind(this);
        this.getRepPassValidState=this.getRepPassValidState.bind(this);
        this.handleNewPassChange=this.handleNewPassChange.bind(this);
        this.handleRepPassChange=this.handleRepPassChange.bind(this);
        this.handleUpdatePassword=this.handleUpdatePassword.bind(this);

        this.handleChangePicture=this.handleChangePicture.bind(this);
        this.handlePictureOnChange=this.handlePictureOnChange.bind(this);
        this.handleUpdatePicture=this.handleUpdatePicture.bind(this);

        this.handleChangeRole=this.handleChangeRole.bind(this);
        this.handleRoleOnChange=this.handleRoleOnChange.bind(this);
        this.handleUpdateRole=this.handleUpdateRole.bind(this);

    }

    updateProfile(){
        let profile=this.state.profile;
        if (this.state.newPass.length)
            profile.password=this.state.newPass;
        profile.token=this.props.credentials.token;
        requestJSON('/users/'+this.props.profileId,'PUT',JSON.stringify(profile)).then(
            (response)=>{
                this.getProfile();
            }
        )
    }

    getProfile(){
        requestJSON('/users/'+this.props.profileId+'?token='+this.props.credentials.token)
            .then((response)=> {
                if (response.status===401)
                    window.location='http://localhost:3000';
                return response.json()})
            .then((body)=>{
                this.setState({profile:body})
            })

    }

    handleEditName(event){
        event.preventDefault();
        this.setState({nameEdit:true})
    }

    getEditNameValidState(){
        if (this.state.profile.name.length>0)
            return null;
        return 'error';
    }

    handleNameChange(event){
        let profile=this.state.profile;
        profile.name=event.target.value;
        this.setState({profile:profile});
        event.preventDefault();

    }

    handleUpdateName(event){
        if (!this.getEditNameValidState())
            this.setState({nameEdit:false},()=>{
                this.updateProfile();
            });
        event.preventDefault();
    }

    renderName(){
        if (!this.state.nameEdit)
            return (
                <ListGroupItem>
                    Name: {this.state.profile.name}
                    <p style={{paddingTop:'10px'}}>
                        <Button onClick={this.handleEditName}>Edit Name</Button>
                    </p>
                </ListGroupItem>
            );

        return (
            <ListGroupItem>
                <Form>
                    <FormGroup controlId='nameInput' validationState={this.getEditNameValidState()}>
                        <ControlLabel>Name:</ControlLabel>
                        <FormControl type='text' value={this.state.profile.name} onChange={this.handleNameChange}/>
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
        if (!this.getRepPassValidState() && !this.getNewPassValidState())
            this.setState({passChange:false},()=>{
                this.updateProfile();
            });
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

    handleChangePicture(event){
        this.setState({picEdit:true});
        event.preventDefault();
    }


    handlePictureOnChange(event){
        let profile=this.state.profile;
        profile.picture=event.target.value;
        this.setState({profile:profile},()=>{
            fetch(this.state.profile.picture).then((response)=>{this.setState({picValidState:null})}).catch((reason)=>{this.setState({picValidState:'error'})});
        });
        event.preventDefault();
    }

    handleUpdatePicture(event){
        if (!this.state.picValidState)
            this.setState({picEdit:false},()=>{
                this.updateProfile();
            });
        event.preventDefault();
    }

    renderPicture(){
        if (!this.state.picEdit)
            return (
                <ListGroupItem>
                    Picture: {this.state.profile.picture}
                    <p style={{paddingTop:'10px'}}>
                        <Button onClick={this.handleChangePicture}>Change Picture</Button>
                    </p>
                </ListGroupItem>
            );
        return (
            <ListGroupItem>
                <Form>
                    <FormGroup controlId={'changePassword'} validationState={this.state.picValidState}>
                        <ControlLabel>Picture:</ControlLabel>
                        <FormControl type={'text'} value={this.state.profile.picture} onChange={this.handlePictureOnChange}/>
                    </FormGroup>
                    <Button type={'submit'} onClick={this.handleUpdatePicture}>Update Picture</Button>
                </Form>
            </ListGroupItem>
        );
    }

    handleChangeRole(event){
        this.setState({roleChange:true});
        event.preventDefault();
    }

    handleRoleOnChange(event){
        let profile=this.state.profile;
        profile.role=event.target.value;
        this.setState({profile:profile});
    }

    handleUpdateRole(event){
        this.setState({roleChange:false},()=>{
            this.updateProfile();
        });
        event.preventDefault();
    }


    renderRole(){
        if (this.props.showRole){
            if (this.state.roleChange){
                return(
                    <ListGroupItem>
                        <Form>
                            <FormGroup controlId={'changeRole'} >
                                <ControlLabel>Role:</ControlLabel>
                                <Radio name={'roleRadio'} value={'user'} onChange={this.handleRoleOnChange}>
                                    user
                                </Radio>
                                <Radio name={'roleRadio'} value={'admin'} onChange={this.handleRoleOnChange}>
                                    admin
                                </Radio>
                            </FormGroup>
                            <Button type={'submit'} onClick={this.handleUpdateRole}>Update Role</Button>
                        </Form>
                    </ListGroupItem>
                )
            }
            return(
                <ListGroupItem>
                    Role: {this.state.profile.role}
                    <p style={{paddingTop:'10px'}}>
                        <Button onClick={this.handleChangeRole}>ChangeRole</Button>
                    </p>
                </ListGroupItem>
            )
        }
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
                    {this.renderPicture()}
                    {this.renderRole()}
                    {this.renderPassword()}
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