import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Form, Container, Button, Col } from 'react-bootstrap';

export default class Login extends Component {

    state = {
        email: '',
        password:'',
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <>
                <Container
                    className="App"
                >
                    <h2 style={{ textAlign:'center'}}>Sign In </h2>

                    <Form className="form" style={{textAlign:'center'}}>
                        <Form.Group>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        id="exampleEmail"
                                        placeholder="abc@gmail.com"
                                        onChange = {this.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label for="examplePassword">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        id="examplePassword"
                                        placeholder="********"
                                        onChange = {this.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button >Login</Button>
                            </Col>
                            <Col>
                                Don't have an account ? <Link to='/register'>Register</Link>
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            </>
        )
    }
}
