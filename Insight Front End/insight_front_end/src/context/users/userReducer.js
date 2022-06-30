import {
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
} from "../types/types";

export default (state, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: false,
      };

    case FETCH_USERS_FAIL:
      return {
        ...state,
        users: [],
        loading: false,
        error: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        success: true,
        error: null,
      };
    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        success: true,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        profile: {},
        error: action.payload,
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        success: true,
      };
    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
