import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types/types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload);
      return { ...state, loading: false };

    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        role: null,
        token: null,
        loading: false,
        error: action.payload, // { "error" : }
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
    //   console.log(action.payload.role);
    //   console.log("token is", action.payload.token);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        role:action.payload.role,
        token: localStorage.getItem("token")
          ? localStorage.getItem("token")
          : null,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        role: null,
        token: null,
        loading: false,
        error: action.payload, // { "error" : }
      };

    case LOGOUT:
        localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        role: null,
        token: null,
        loading: false,
        error: false, // { "error" : }
      };
    default:
      return state;
  }
};
