import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../constants/signupConstants";

interface SignupState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SignupState = {
  loading: false,
  error: null,
  success: false,
};

const signupReducer = (state = initialState, action: any): SignupState => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, success: true };
    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default signupReducer;


