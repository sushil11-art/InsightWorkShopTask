import React, { useReducer } from "react";
import axios from "../../api/axios";
import {
  DELETE_USER_SUCCESS,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
  DELETE_USER_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  GET_PROFILE_SUCCESS,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  GET_PROFILE_FAIL,
} from "../types/types";
import UserContext from "./userContext";
import userReducer from "./userReducer";

const UserState = (props) => {
  const initialState = {
    users: [],
    loading: true,
    error: null,
    success: null,
    profile: {},
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/allUsers", {
        headers: { "x-auth-token": token },
      });
      // console.log(res.data);
      dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data.users });
    } catch (err) {
      //   dispatch({ type: FETCH_USERS_FAIL, payload: "Failed to fetch users" });
      //   console.log(err);
    }
  };

  const editUser = async (data, userId,navigate) => {
    const token = localStorage.getItem("token");
    let userInfo;

    if (data.userType == "admin") {
      userInfo = {
        name: data.name,
        isAdmin: true,
      };
    } else {
      userInfo = {
        name: data.name,
        isAdmin: false,
      };
    }
    let formData = JSON.stringify(userInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    try {
      const res = await axios.put(`/editUser/${userId}`, formData, config);
      // console.log(res.data);
      fetchAllUsers();
      // dispatch({ type: ADD_USER_SUCCESS, payload: res.data });
      navigate("/userList");
      // console.log(res.datsa);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async (data, navigate) => {
    const token = localStorage.getItem("token");
    let userInfo;

    if (data.userType == "admin") {
      userInfo = {
        name: data.name,
        email: data.email,
        isAdmin: true,
      };
    } else {
      userInfo = {
        name: data.name,
        email: data.email,
        isAdmin: false,
      };
    }
    let formData = JSON.stringify(userInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    try {
      const res = await axios.post("/addUser", formData, config);
      dispatch({ type: ADD_USER_SUCCESS, payload: res.data });
      navigate("/userList");
      // console.log(res.datsa);
    } catch (err) {
      dispatch({
        type: ADD_USER_FAIL,
        payload: " USER WITH THAT EMAIL ALREADY EXIST",
      });
    }
  };


  const deleteUser = async (userId) => {
    try {
      //   const token = localStorage.getItem("token");
      //   const res = await axios.delete(`/deleteUser/${userId}`, {
      //     headers: { "x-auth-token": token },ss
      //   });
      //   console.log(res.data);
      //   dispatch({
      //     type: DELETE_USER_SUCCESS,
      //     payload: "User removed successfully",
      //   });
      //   fetchAllUsers();
    } catch (err) {
      //   dispatch({ type: DELETE_USER_FAIL, payload: "Failed to delete user" });
    }
  };

  const viewProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/viewProfile", {
        headers: { "x-auth-token": token },
      });
      // console.log(res.data);
      dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data.profile });
    } catch (err) {
      dispatch({
        type: GET_PROFILE_FAIL,
        payload: "Failed to get profile details",
      });
      //   console.log(err);
    }
  };

  const editProfile = async (formData,navigate) => {
    const token = localStorage.getItem("token");
    console.log("we are here",formData)
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    try {
      const res = await axios.put("/editProfile", formData, config);
      // console.log(res.data);
      dispatch({ type: EDIT_PROFILE_SUCCESS, payload: res.data.profile});
      navigate("/profile");
      // console.log(res.datsa);
    } catch (err) {
      console.log(err);
      dispatch({
        type: EDIT_PROFILE_FAIL,
        payload: " Failed to update profile ",
      });
    }
  };
  return (
    <UserContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        error: state.error,
        success: state.success,
        profile: state.profile,
        fetchAllUsers,
        deleteUser,
        addUser,
        editUser,
        viewProfile,
        editProfile
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
