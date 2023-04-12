import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand as={Link} to='/'>
            Moovies
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!user && (
              <>
                <Nav.Link as={Link} to='/login'>
                  login
                </Nav.Link>
                <Nav.Link as={Link} to='/signup'>
                  signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to='/'>
                  home
                </Nav.Link>
                <Nav.Link as={Link} to='/profile'>
                  profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

