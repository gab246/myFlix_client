import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, 
      title: 'Finding Nemo', 
      description: 'It tells the story of an overprotective clownfish named Marlin who, along with a regal blue tang named Dory, searches for his missing son Nemo. Along the way, Marlin learns to take risks and comes to terms with Nemo taking care of himself' , 
      image: 'https://via.placeholder.com/270x480.png?text' , 
      genre: 'Animated' , 
      director: 'Andrew Stanton'},
    { id: 2, 
      title: 'Cars 1', 
      description: 'On the way to the biggest race of his life, a hotshot rookie race car gets stranded in a rundown town, and learns that winning isn\'t everything in life' , 
      image: 'https://via.placeholder.com/270x480.png?text' , 
      genre: 'Animated' , 
      director: 'John Lasseter'},
    { id: 3,
      title: 'UP' , 
      description: 'As a boy, Carl Fredricksen wanted to explore South America and find the forbidden Paradise Falls. About 64 years later he gets to begin his journey along with Boy Scout Russell by lifting his house with thousands of balloons.', 
      image: 'https://via.placeholder.com/270x480.png?text', 
      genre: 'Adventure', 
      director: 'Pete Docter'},
  ]);
  
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