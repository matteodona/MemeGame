import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LogoutButton } from './Authentication';

function Header(props){
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as="div" style={{ marginRight: '20px' }}>
          <Link to="/" className="navbar-brand">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#007BFF" className="bi bi-house-door-fill" viewBox="0 0 16 16">
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
            </svg>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ms-auto" style={{ paddingRight: 30 }}>
          {props.loggedIn ? 
            <LogoutButton logout={props.handleLogout} /> :
            <Link to='/login'className='btn btn-outline-primary'>Login</Link>
          }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export { Header };


