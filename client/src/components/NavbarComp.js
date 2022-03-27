import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarComp() {
    return (
        <Navbar sticky="top" bg="light" variant="light" expand="lg">
            <Container>
                <Navbar.Brand href="/user">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Transactions" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/transaction">Transaction history</NavDropdown.Item>
                            <NavDropdown.Item href="/transaction/create">New transaction</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/user/register">Register</Nav.Link>
                        <Nav.Link href="/user/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComp;