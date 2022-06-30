// import logo from './logo.svg';
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { Fragment } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser";
// import EditUser from "./components/EditUser";

import AdminRequiredAuth from "./components/AdminAuth";
import EditProfile from "./components/EditProfile";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import NormalUserRequiredAuth from "./components/NormalUserAuth";
import Profile from "./components/Profile";
import Register from "./components/Register";
import UserList from "./components/UserList";
import AuthState from "./context/auth/authState";
import UserState from "./context/users/userState";

function App() {
  return (
      <UserState>
        <Router>
          <Fragment>
            <NavBar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/userList"
                element={
                  <AdminRequiredAuth>
                    <UserList />
                  </AdminRequiredAuth>
                }
              />
              <Route
                exact
                path="/addUser"
                element={
                  <AdminRequiredAuth>
                    <AddUser />
                  </AdminRequiredAuth>
                }
              />
            

              <Route
                exact
                path="/profile"
                element={
                  <NormalUserRequiredAuth>
                    <Profile />
                  </NormalUserRequiredAuth>
                }
              />
              <Route
                exact
                path="/editProfile"
                element={
                  <NormalUserRequiredAuth>
                    <EditProfile />
                  </NormalUserRequiredAuth>
                }
              />
            </Routes>
          </Fragment>
        </Router>
      </UserState>
  );
}

export default App;
