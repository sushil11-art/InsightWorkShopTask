import React, { useReducer } from "react";
import axios from "../../api/axios";
import { REGISTER_SUCCESS,REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from "../types/types";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    isAuthenticated: null,
    loading: true,
    error: null,
    role:null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerAdmin = async (formData,navigate) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/registerAdmin", formData, config);
      // console.log( "token is " + res.data.token ) token has come
      //if everything goes well, dispatch register success
      // console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token, // token as payload
      });
      navigate('/login');
    } catch (err) {
        dispatch({
          type: REGISTER_FAIL,
          payload: "User with that Email Already exist"
        });
    }
  };

  const loginUser=async(formData,navigate)=>{
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/loginUser", formData, config);
      // console.log( "token is " + res.data.token ) token has come
      //if everything goes well, dispatch register success
      // console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data, // token as payload
      });
      navigate("/")
    } catch (err) {
        dispatch({
          type: LOGIN_FAIL,
          payload: "Please check your credentials"
        });
    }

  }
  const logoutUser=async()=>{
    dispatch({
      type:LOGOUT
    })
    
  }
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        role:state.role,
        registerAdmin,
        loginUser,
        logoutUser,
      
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
