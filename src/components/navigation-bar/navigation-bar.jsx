import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './navigation-bar.scss';
import { Form } from 'react-bootstrap'

export const NavigationBar = ({ user, onLoggedOut, handleSearch }) => {
  return (
    <Navbar  className='nav-bar' expand='sm'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='logo'>
            MOOVIES
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="basic-navbar-nav">
            <Nav className='ms-auto gap-2'>
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
                <Form>
                  <Form.Control
                  type="search"
                  placeholder="search by title"
                  aria-label="Search"
                  onChange={handleSearch}
            />
                </Form>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

