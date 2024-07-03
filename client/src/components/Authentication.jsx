import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoginForm(props) {
  const [username, setUsername] = useState('mario.rossi@meme.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };
    props.login(credentials);
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={4}> 
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='username' className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} size="sm" />
          </Form.Group>

          <Form.Group controlId='password' className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={4} size="sm" />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button type='submit' size="sm">Login</Button>
            <Link className='btn btn-danger btn-sm' to={'/'}>Cancel</Link>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

function LogoutButton(props) {
  return(
    <Button variant='outline-danger' onClick={props.logout}>Logout</Button>
  )
}

export { LoginForm, LogoutButton };
