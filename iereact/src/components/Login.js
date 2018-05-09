import React, {Component} from 'react';
import {FormControl, FormGroup, Form, Col, ControlLabel, Button, HelpBlock} from 'react-bootstrap';
import requestJSON from "../services/requestJSON";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        };
        this.getValidationEmailState=this.getValidationEmailState.bind(this);
        this.getValidationPassState=this.getValidationPassState.bind(this);
        this.onEmailChange=this.onEmailChange.bind(this);
        this.onPassChange=this.onPassChange.bind(this);
        this.handleLoginClick=this.handleLoginClick.bind(this);

    }

    getValidationEmailState(){
        let emailRe=/^\S+@\S+\.\S+$/g;
        if(this.state.email.match(emailRe))
            return null;
        return 'error';
    }
    getValidationPassState(){
        let passRe=/^\S{6,}$/g;
        if (this.state.password.match(passRe))
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

    handleLoginClick(event){
        if (!this.getValidationEmailState() && !this.getValidationPassState()){
            requestJSON('/login/','POST',JSON.stringify({email:this.state.email, password: this.state.password}))
                .then((response)=>{
                    if (response.status!==401)
                        return response.json();
                    else
                        return null;
                })
                .then((body)=>{
                    if (body) {
                        this.props.setCredentials(body);
                        this.props.changeWelcomeTitle('You have successfully logged in!!!');
                        this.props.changeMain('Welcome');
                    }
                    else {
                        this.props.changeWelcomeTitle('Wrong login credentials');
                        this.props.changeMain('Welcome');
                    }
                })
        }
        event.preventDefault();
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
                            <HelpBlock>Password must be at least 6 characters long</HelpBlock>
                        </Col>
                    </FormGroup>


                    <FormGroup>
                        <Col smOffset={1} sm={10}>
                            <Button type="submit" onClick={this.handleLoginClick}>Login</Button>
                        </Col>
                    </FormGroup>
                </Form>
        )
    }
}