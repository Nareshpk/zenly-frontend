import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants/loginConstants";



export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData: any) => ({
  type: LOGIN_SUCCESS,
  role: userData.role,
  payload: userData.payload,
});

export const loginFailure = (error: any) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginAction = (credentials: any) => {
  return async (dispatch: any) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        credentials
      );
      const { token, role } = response.data;
      localStorage.setItem("bearerToken", JSON.stringify(token));
      const decodedToken = jwtDecode(token); // Decode the token
      localStorage.setItem(
        "auth",
        JSON.stringify({ isAuthenticated: true, role: role, user: decodedToken })
      );
      return dispatch(loginSuccess({ type: "LOGIN_SUCCESS", role: role, payload: response.data }));
    } catch (error: any) {
      dispatch(loginFailure(error.response.data));
    }
  };
};
