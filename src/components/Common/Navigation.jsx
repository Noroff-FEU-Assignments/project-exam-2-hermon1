import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from "../../pages/Login/Login"
import AuthContext, { AuthProvider } from "../../context/AuthContext";
import Dashboard from "../../pages/Dashboard/Dashboard";
import RegisterUser from "../../pages/Register/RegisterUser";
import PostDetails from "../../pages/Post/PostDetails";
import Profile from "../../pages/Profile/Profile";
import UserProfile from "../../pages/Profile/User";
import { useContext } from "react";
import CreatePost from "../../pages/Post/CreatesPost";
import ViewUserPosts from "../../pages/Profile/ViewUserPosts";
import EditPost from "../../pages/Post/EditPost";
import UserProfiles from "../../pages/Profile/ProfilesList";
import Logout from "../logout/Logout";
import Followers from "../../pages/Profile/FollowerList";
import FollowingList from "../../pages/Profile/FollowingList";

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
              <Route path="/" exact element={ auth ? <Dashboard /> : <Login/>} />
              <Route path="/register" exact element={<RegisterUser />} />
              <Route path="/dashboard" exact element={<Dashboard />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/createposts" element={<CreatePost />} />
              <Route path="/profile/:name" element={<Profile />} />
              <Route path="/viewPosts" element={<ViewUserPosts />} />
              <Route path="/editPost/:id" element={<EditPost />} />
              <Route path="/userprofiles" element={<UserProfiles />} />
              <Route path="/followers/:name" element={<Followers />} />
              <Route path="/following/:name" element={<FollowingList />} />
            </Routes>
          </Container>
        </Router>
    </>
  )
}