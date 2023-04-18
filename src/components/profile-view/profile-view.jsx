import { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {


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
            
       
      )
