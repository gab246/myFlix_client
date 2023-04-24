import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export const MovieCard = ({ movie }) => {
  return (
    <Card className='h-100' >
      <Card.Img variant='top' src={movie.image} />
        <Card.Body className='d-flex flex-column justify-content-end'>
          <Card.Title>{movie.title}</Card.Title>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant='secondary'>view</Button>
          </Link>
        </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string.isRequired,
    }).isRequired,
  })
  };