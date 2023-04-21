import { Link } from "react-router-dom";
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import "./movie-view.scss";

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
    <Container>
      <Col>
        <Link to={`/`} className='buttons'>
          <Button className='back-button' variant="secondary">Back</Button>
        </Link>
            { isFavorite 
            ? (<Button onClick={removeFavorite} className='remove_fav' variant="secondary">Remove from Favorites</Button>)
              : (<Button  onClick={addFavorite} className='add_fav' variant="secondary">Add to Favorites</Button>)
            }
            </Col>
        <section>
          <img src={movie.image}  className='image'/>
        </section>
        <section>
          <h2>Title: </h2>
          <p>{movie.title}</p>
        </section>
        <section>
          <h3>Description: </h3>
          <p>{movie.description}</p>
        </section>
        <section>
          <h3>Genre </h3>
        </section>
        <section>
          <h3>Name: </h3>
          <p>{movie.genre.name}</p>
        </section>
        <section>
          <h3>Description:</h3>
          <p>{movie.genre.description}</p>
        </section>
        <section>
          <h3>Director </h3>
        </section>
        <section>
          <h3>Name: </h3>
          <p>{movie.director.name}</p>
        </section>
        <section>
          <h3>Bio: </h3>
          <p>{movie.director.bio}</p>
        </section>
        <section>
          <h3>Birth Year: </h3>
          <p>{movie.director.birth}</p>
        </section>
            
      </Container>
    );
  };
      
