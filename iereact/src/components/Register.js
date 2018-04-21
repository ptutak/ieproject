import React, {Component} from 'react';
import {FormControl, FormGroup, Form, Col, ControlLabel, Button} from 'react-bootstrap';
export default class Register extends Component{
    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="formHorizontalLogin">
                    <Col componentClass={ControlLabel} sm={1}>
                        Login
                    </Col>
                    <Col sm={10}>
                        <FormControl type="login" placeholder="Login" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={1}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPasswordCheck">
                    <Col componentClass={ControlLabel} sm={1}>
                        Repeat password
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Repeat password" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={1}>
                        Name
                    </Col>
                    <Col sm={10}>
                        <FormControl type="text" placeholder="Name" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalDateOfBirth">
                    <Col componentClass={ControlLabel} sm={1}>
                        Date of birth
                    </Col>
                    <Col sm={10}>
                        <FormControl type="date"/>
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