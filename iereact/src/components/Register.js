import React, {Component} from 'react';
import {FormControl, FormGroup, Form, Col, ControlLabel, Button} from 'react-bootstrap';
export default class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            repPassword:'',
            name:''
        };
        this.getValidationState=this.getValidationState.bind(this);
        this.onEmailChange=this.onEmailChange.bind(this);
        this.onPassChange=this.onPassChange.bind(this);
        this.onRepPassChange=this.onRepPassChange.bind(this);
        this.onNameChange=this.onNameChange.bind(this);
    }

    getValidationState(){
        let emailRe=/^\S+@\S+\.\S+$/g;
        return 'warning';
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
    render(){
        return (
            <Form horizontal>
                <FormGroup
                    controlId="formHorizontalLogin"
                    validationState={this.getValidationState()}>
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

                <FormGroup controlId="formHorizontalPassword">
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

                <FormGroup controlId="formHorizontalPasswordCheck">
                    <Col componentClass={ControlLabel} sm={1}>
                        Repeat password
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="password"
                            placeholder="Repeat password"
                            onChange={this.onRepPassChange}
                            value={this.state.repPassword}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={1}>
                        Name
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            placeholder="Name"
                            onChange={this.onNameChange}
                            value={this.state.name}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={1} sm={10}>
                        <Button type="submit">Register</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}