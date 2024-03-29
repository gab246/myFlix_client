import React from "react";
import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://desolate-sierra-27780.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("This user does not exist");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Card className="mt-5 mb-5">
      <Card.Body>
        <Card.Title>LOGIN</Card.Title>
        <Form onSubmit={handleSubmit} className="mt-4 mb-4">
          <Form.Group controlId="formUsername" className="mt-4 mb-4">
            <Form.Label>Username: </Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="6"
              className="bg-light"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-4 mb-4">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="bg-light"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-4">
            {" "}
            LOGIN!
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
