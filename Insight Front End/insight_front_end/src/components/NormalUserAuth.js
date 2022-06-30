import React, { useContext } from "react";
import {Container} from "react-bootstrap";
import AuthContext from "../context/auth/authContext";

const NormalUserRequiredAuth = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, role } = authContext;
//   console.log(isAuthenticated, role);
  if (isAuthenticated && role == "user") {
    return children;
  } else {
    return <Container>Only normal authenticated user can view/edit their profile</Container>;
  }
};

export default NormalUserRequiredAuth;