import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className='h-100' onClick={() => onMovieClick(movie)} >
      <Card.Img variant='top' src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Button onClick={() => onMovieClick(movie)} variant='link'>
            View
          </Button>
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
    onMovieClick: PropTypes.func
  })
  };