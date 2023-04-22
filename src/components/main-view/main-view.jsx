import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [viewMovies, setViewMovies] = useState(movies);
  const [filteredMovies, setFilteredMovies ] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://desolate-sierra-27780.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
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
              birth: movie.Director.Birth,
            },
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  useEffect(() => {
    setViewMovies(movies);
  }, [movies]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies])

  const handleSearch = (e) => {
    const searchWord = e.target.value.toLowerCase();
    let tempArray = movies.filter((movies) => movies.title.toLowerCase().includes(searchWord))
    setFilteredMovies(tempArray);
  };
  
  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        handleSearch={handleSearch}
      />
      <Row className="justify-content-md-center mt-3">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => { 
                      setUser(user);
                      setToken(token);
                    }}
                    />
                  </Col>
                )}
              </>
            }
          />
            <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={12}>
                    <ProfileView  user={user} token={token} movies={movies} onLoggedOut={() => { 
                      setUser(null); 
                      setToken(null); 
                      localStorage.clear();
                    }} 
                      updateUser={updateUser}
                      />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>Opps! The list is empty!</div>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} token={token} updateUser={updateUser}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <div>Opps, the list is empty! Please wait. Loading data from API.</div>
                ) : (
                  <>
                    {filteredMovies.map(movie => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} user={user} updateUser={updateUser} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
