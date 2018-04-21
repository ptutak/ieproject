import React, {Component} from 'react';
import {FormControl, FormGroup, Form, Col, ControlLabel, Button} from 'react-bootstrap';

export default class Login extends Component{
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
                    <FormGroup>
                        <Col smOffset={1} sm={10}>
                            <Button type="submit">Login</Button>
                        </Col>
                    </FormGroup>
                </Form>
        )
    }
}