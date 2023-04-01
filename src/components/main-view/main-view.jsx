import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
 
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('https://desolate-sierra-27780.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
  
    const moviesFromApi = data.map((movie) => {
      return {
        id: movie._id,
        title: movie.Title,
        image: movie.ImagePath,
        description: movie.Description,
        genre: {
          name: movie.Genre.Name,
          description: movie.Genre.Description,
          },
        director: {
          name: movie.Director.Name,
          bio: movie.Director.Bio,
          birth: movie.Director.Birth
          }
            
          };
        });
  
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <Row className='justify-content-md-center mt-3'> 
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          <SignupView />
        </Col>
      ) : selectedMovie ? (
      <Col md={8}>
        <MovieView 
          movie={selectedMovie} 
          onBackClick={() => setSelectedMovie(null)} 
        />
      </Col>
      ) : movies.length === 0 ? (
        <div>Opps! The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className='mb-4' key={movie.id} md={3}>
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
            </Col>
          ))}
        </>
      )}
    </Row>
);
};

