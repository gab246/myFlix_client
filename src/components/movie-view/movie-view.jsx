import { Link } from "react-router-dom";
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams();
  const movie = movies.find(m => m.id === movieId);

  const [isFavorite, setIsFavorite] = useState(user.FavoriteMovies.includes(movie.id));

  useEffect(() => {
      setIsFavorite(user.FavoriteMovies.includes(movie.id));
  }, [movieId])

  const addFavorite = () => {
      fetch(`https://desolate-sierra-27780.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${token}` 
          }
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              alert("Failed");
              return false;
          }
      })
      .then(user => {
          if (user) {
              alert(`Good choice! ${movie.title} was added to your favorites`);
              setIsFavorite(true);
              updateUser(user);
          }
      })
      .catch(e => {
          alert(e);
      });
  }

  const removeFavorite = () => {
    fetch(`https://desolate-sierra-27780.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${token}` 
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Failed");
            return false;
        }
    })
    .then(user => {
        if (user) {
            alert(`${movie.title} has been removed from your favorites`);
            setIsFavorite(false);
            updateUser(user);
        }
    })
    .catch(e => {
        alert(e);
    });
}

    return (
      <Col>
        <section>
          <img src={movie.image} />
        </section>
        <section>
          <h5>Title: </h5>
          <p>{movie.title}</p>
        </section>
        <section>
          <h5>Description: </h5>
          <p>{movie.description}</p>
        </section>
        <section>
          <h5>Genre </h5>
        </section>
        <section>
          <h5>Name: </h5>
          <p>{movie.genre.name}</p>
        </section>
        <section>
          <h5>Description:</h5>
          <p>{movie.genre.description}</p>
        </section>
        <section>
          <h5>Director </h5>
        </section>
        <section>
          <h5>Name: </h5>
          <p>{movie.director.name}</p>
        </section>
        <section>
          <h5>Bio: </h5>
          <p>{movie.director.bio}</p>
        </section>
        <section>
          <h5>Birth Year: </h5>
          <p>{movie.director.birth}</p>
        </section>
            
        <Link to={`/`}>
          <Button className='back-button' variant="secondary">Back</Button>
        </Link>
            { isFavorite 
            ? (<Button onClick={removeFavorite} variant="secondary">Remove from Favorites</Button>)
              : (<Button  onClick={addFavorite} variant="secondary">Add to Favorites</Button>)
            }
        </Col>
      );
    };
      
