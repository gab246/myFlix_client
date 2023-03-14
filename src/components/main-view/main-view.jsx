import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view'

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
 
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
        image: `https://via.placeholder.com/270x480.png?text`,
        description: movie.Description,
        genre: {
          name: movie.Genre.Name,
          description: movie.Genre.Description,
          },
        director: {
          name: movie.Director.Name,
          birth: movie.Director.Birth,
          bio: movie.Director.Bio
          }
            
          };
        });
  
        setMovies(moviesFromApi);
      });
  }, [token]);
  
  if (!user) {
    return (
      <LoginView 
        onLoggedIn={(user, token) => {
          setUser(user); 
          setToken(token); 
    }} 
    />
    );
  }

  if (selectedMovie){
    return (
      <>
    <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    </>
  );
  }

  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
}