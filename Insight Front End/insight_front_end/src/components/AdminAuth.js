import React, { useContext } from "react";
import {Container} from "react-bootstrap";
import AuthContext from "../context/auth/authContext";

const AdminRequiredAuth = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, role } = authContext;
  if (isAuthenticated && role == "admin") {
    return children;
  } else {
    return <Container>Only authenticated admin can view user list</Container>;
  }
};

export default AdminRequiredAuth;
