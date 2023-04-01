import { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch('https://desolate-sierra-27780.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed. Please try again');
      }
    });
  };

  return (
<Row className='justify-content-md-center mt-5'>
  <Col md={5}>
    <Card className='mb-5'>
      <Card.Body>
       <Card.Title>JOIN</Card.Title>
        <Form onSubmit={handleSubmit} className='mt-5 mb-5'>
          <Form.Group controlId='formUsername' className='mt-3 mb-3'>
             <Form.Label>Username:</Form.Label>
             <Form.Control 
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength='6'
              className='bg-light'
            />
          </Form.Group>

          <Form.Group controlId='formPassword' className='mt-3 mb-3'>
            <Form.Label>Password:</Form.Label>
            <Form.Control 
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength='6'
              className='bg-light'
            />
          </Form.Group>

          <Form.Group controlId='formEmail' className='mt-3 mb-3'>
            <Form.Label>Email:</Form.Label>
            <Form.Control 
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='bg-light'
            />
           </Form.Group>

          <Form.Group controlId='formBirthday' className='mt-3 mb-3'>
           <Form.Label>Birthday:</Form.Label>
           <Form.Control 
            type='date'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
            className='bg-light'
          />
         </Form.Group> 
     
          <Button variant='primary' type='submit' className='mt-3 mb-3'>SUBMIT!</Button>
        </Form>
      </Card.Body>
    </Card>
  </Col>
</Row>

);
};