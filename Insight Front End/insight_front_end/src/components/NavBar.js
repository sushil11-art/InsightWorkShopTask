import React, { Fragment, useContext } from "react";

import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";


const NavBar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logoutUser} = authContext;

  const navigate= useNavigate();

  const signoutUser=()=>{
    logoutUser();
    navigate("/")
  }
  const GuestLinks = (
    <Fragment>
      <Nav.Link>
        <Link to="/login">Login</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/register">Register</Link>
      </Nav.Link>
    </Fragment>
  );

  const AuthLinks = (
    <Fragment>
      <Nav.Link>
        <Button onClick={signoutUser}>Signout</Button>
      </Nav.Link>
      <Nav.Link>
        <Link to="/userList">UserList</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/profile">Profile</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/editProfile"> Edit Profile</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/addUser">Add User</Link>
      </Nav.Link>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/"> Insight Workshsop</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Fragment> {isAuthenticated ? AuthLinks : GuestLinks} </Fragment>
            </Nav>
            <Nav>
              <Fragment></Fragment>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavBar;
