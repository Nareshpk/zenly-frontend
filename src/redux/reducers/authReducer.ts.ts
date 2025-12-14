import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../constants/loginConstants";

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../constants/signupConstants";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  role: null,
  token: null,
  error: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    /* ================= LOGIN ================= */

    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        role: action.role,
        user: action.payload?.user || action.payload,
        token: action.payload?.token,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    /* ================= SIGNUP ================= */

    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    /* ================= LOGOUT (OPTIONAL) ================= */

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
