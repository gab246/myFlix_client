import { Link } from "react-router-dom";
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find(m => m.id === movieId);

   

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
              <p>{movie.director.bio} </p>
            </section>
            <section>
              <h5>Birth Year: </h5>
              <p>{movie.director.birth} </p>
            </section>
            
            <Link to={`/`}>
              <Button className='back-button'>Back</Button>
            </Link>
              { isFavorite 
            ? (<Button onClick={removeFavorite}>Remove from Favorites</Button>)
              : (<Button  onClick={addFavorite}>Add to Favorites</Button>)
            }
        
          </Col>
        
         
        );
      };
      
