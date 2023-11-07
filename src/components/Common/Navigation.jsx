import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from "../../pages/Login/Login"
import RegisterUser from "../../pages/Register/RegisterUser";
import { useContext } from "react";
import AuthContext, { AuthProvider } from "../../context/AuthContext";
import Logout from "../logout/Logout";

export default function NavigationLayout() {
    const [auth, setAuth] = useContext(AuthContext);

    return (
        <>
            <Router>
              <Navbar expand="lg">
                <Navbar.Brand href="/">Anti Social</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    {auth ? (
                      <>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/userprofiles">Users</Nav.Link>
                        <Nav.Link href="/user">{auth.name}</Nav.Link>
                        <NavDropdown id="basic-nav-dropdown">
                          <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
                          <NavDropdown.Item href="/viewPosts">
                            View your posts
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/createposts">Create new post</NavDropdown.Item>
                        </NavDropdown>
                        <Logout/>
                      </>
                    ) 
                    : (
                      <Nav.Link  href="/">Login</Nav.Link>
                      )
                    }
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <Container fluid>
                <Routes>
 
                  <Route path="/register" exact element={<RegisterUser />} />
                  
                </Routes>
              </Container>
            </Router>
        </>
      )
    }