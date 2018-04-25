import React, {Component} from 'react';
import {FormControl, FormGroup, Form, Col, ControlLabel, Button} from 'react-bootstrap';
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
            let user={email:this.state.email, password: this.state.password};
            requestJSON('/login/','POST',JSON.stringify({user:user}))
                .then((response)=>response.json())
                .then((body)=>{console.log(body)});
        }
        else if (!this.getValidationEmailState()){
            event.preventDefault();
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