import React, {Component} from 'react';
import {FormControl, FormGroup, Form, Col, ControlLabel, Button, HelpBlock} from 'react-bootstrap';
import requestJSON from '../services/requestJSON';



export default class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            repPassword:'',
            name:''
        };
        this.getValidationEmailState=this.getValidationEmailState.bind(this);
        this.getValidationNameState=this.getValidationNameState.bind(this);
        this.getValidationPassState=this.getValidationPassState.bind(this);
        this.getValidationRepPassState=this.getValidationRepPassState.bind(this);
        this.onEmailChange=this.onEmailChange.bind(this);
        this.onPassChange=this.onPassChange.bind(this);
        this.onRepPassChange=this.onRepPassChange.bind(this);
        this.onNameChange=this.onNameChange.bind(this);
        this.handleRegisterClick=this.handleRegisterClick.bind(this);
    }

    getValidationEmailState(){
        let emailRe=/^\S+@\S+\.\S+$/g;
        if(this.state.email.match(emailRe))
            return null;
        return 'error';
    }
    getValidationNameState(){
        let nameRe=/\S+/g;
        if (this.state.name.match(nameRe))
            return null;
        return 'error';
    }
    getValidationPassState(){
        let passRe=/^\S{6,}$/g;
        if (this.state.password.match(passRe))
            return null;
        return 'error';
    }
    getValidationRepPassState(){
        if (this.state.repPassword===this.state.password)
            return null;
        return 'error';
    }

    onEmailChange(event){
        this.setState({email:event.target.value});
        event.preventDefault();
    }
    onPassChange(event){
        this.setState({password:event.target.value});
        event.preventDefault();
    }
    onRepPassChange(event){
        this.setState({repPassword:event.target.value});
        event.preventDefault();
    }
    onNameChange(event){
        this.setState({name:event.target.value});
        event.preventDefault();
    }

    handleRegisterClick(event){
        if (!this.getValidationNameState()&&!this.getValidationEmailState()&&!this.getValidationPassState()&&!this.getValidationRepPassState()) {
            requestJSON('/users/', 'POST', JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            }))
                .then((response) => {
                    if (response.status === 409){
                        alert('Email already exists');
                        event.preventDefault();
                    }
                });
        }
        else if (!this.getValidationEmailState()) {
            event.preventDefault();
        }
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup
                    controlId="formHorizontalEmail"
                    validationState={this.getValidationEmailState()}>
                    <Col componentClass={ControlLabel} sm={1}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="email"
                            placeholder="Email"
                            onChange={this.onEmailChange}
                            value={this.state.email}/>
                        <FormControl.Feedback />
                        <HelpBlock>Email has to have a valid e-mail format.</HelpBlock>
                    </Col>
                </FormGroup>

                <FormGroup
                    controlId="formHorizontalPassword"
                    validationState={this.getValidationPassState()}>
                    <Col componentClass={ControlLabel} sm={1}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="password"
                            placeholder="Password"
                            onChange={this.onPassChange}
                            value={this.state.password}/>
                        <FormControl.Feedback />
                        <HelpBlock>Password must be at least 6 characters long.</HelpBlock>
                    </Col>
                </FormGroup>

                <FormGroup
                    controlId="formHorizontalRepPass"
                    validationState={this.getValidationRepPassState()}>
                    <Col componentClass={ControlLabel} sm={1}>
                        Repeat password
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="password"
                            placeholder="Repeat password"
                            onChange={this.onRepPassChange}
                            value={this.state.repPassword}/>
                        <FormControl.Feedback />
                        <HelpBlock>Repeated password must match the password.</HelpBlock>
                    </Col>
                </FormGroup>

                <FormGroup
                    controlId="formHorizontalName"
                    validationState={this.getValidationNameState()}>
                    <Col componentClass={ControlLabel} sm={1}>
                        Name
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            placeholder="Name"
                            onChange={this.onNameChange}
                            value={this.state.name}/>
                        <FormControl.Feedback />
                        <HelpBlock>Name cannot be empty.</HelpBlock>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={1} sm={10}>
                        <Button type="submit" onClick={this.handleRegisterClick}>Register</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}