import React, { Component } from 'react';

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

export default class NavigationBar extends Component {
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Swap Shop</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-3" />
                        {/* <Button variant="outline-info" style={{marginRight:'10px'}}>Search</Button> */}
                        <Button variant="outline-info" style={{ marginRight: '10px' }} href = "/login" >Login</Button>
                        <Button variant="outline-info" style={{marginRight:'10px'}} href = "/register" >Sign up</Button>
                    </Form>
                </Navbar>
            </>
        )
    }
}
