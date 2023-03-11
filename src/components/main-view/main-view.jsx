import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://desolate-sierra-27780.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => {
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
  }, []);
  
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie){
    return (
    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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