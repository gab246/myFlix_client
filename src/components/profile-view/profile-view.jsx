import { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  let favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie._id));
    
  const handleSubmit = event => {
    event.preventDefault();

  const data = {
    username,
    password,
    email,
    birthday
 }

  fetch(`https://desolate-sierra-27780.herokuapp.com/users/${user.Username}`, {
    method: "PUT",
    body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
        .then(response => {
            if (response.ok) {
              return response.json();
            } else {
                alert("failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
              alert("Your account information has been updated!");
              updateUser(user);
            }
        })
        .catch(e => {
          alert(e);
        });
    }

    const deleteAccount = () => {
      fetch(`https://desolate-sierra-27780.herokuapp.com/users/${user.Username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
          if (response.ok) {
            alert("Your account has been deleted. It's sad to see you go!");
            onLoggedOut();
          } else {
            alert("failed");
          }
      })
      .catch(e => {
        alert(e);
      });
  }

    return (
        <>
          <h1>Account Details</h1>

          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Account Details</Card.Title>
                  <p className="mt-4 mb-4">Username: {user.Username}</p>
                  <p className="mt-4 mb-4">Email: {user.Email}</p>
                  <p className="mt-4 mb-4">Date of Birth: {user.Birthday.slice(0,10)}</p>
              </Card.Body>
            </Card>
    
          <Col md={12}>
            <Card className='mt-4 mb-4'>
              <Card.Body>
                <Card.Title>Your Favorite Movies</Card.Title>
              </Card.Body>
            </Card>
          </Col> 
          <Col md={6}>
            {favoriteMovies.map(movie => (
          <Col className="mb-4 mt-4" key={movie._id} >
            <MovieCard movie={movie} />
          </Col>
        )) 
      }
    </Col>
  </Col>
            
        <Col md={6}>
          <Card className="mt-5 mb-5">
            <Card.Body>
              <Card.Title>Update Account Information</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Group className="mt-4 mb-4">
                        <Form.Label>Username: </Form.Label>
                          <Form.Control
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            minLength="6"
                            required
                            className="bg-light"
                            />
                       </Form.Group>

                      <Form.Group className="mt-4 mb-4">
                        <Form.Label>Password: </Form.Label>
                          <Form.Control
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            minLength="6"
                            required
                            className="bg-light"
                          />
                      </Form.Group>

                      <Form.Group className="mt-4 mb-4">
                        <Form.Label>Email: </Form.Label>
                          <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="bg-light" />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Date of Birth: </Form.Label>
                          <Form.Control
                            type="date" 
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
                            required 
                            className="bg-light" />
                      </Form.Group>
                      </Form.Group>
                            <Button className="mt-3" variant="primary" type="submit">SUBMIT</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
         
    
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Delete Account</Card.Title>
                      <p>Do you wish to delete your account?</p>
                 <Button variant="danger" onClick={() => {if (confirm("Are you sure you want to delete your account?")) 
                      deleteAccount();
                    }}>DELETE</Button>
                </Card.Body>
              </Card>
            </Col>
        </>
)}
