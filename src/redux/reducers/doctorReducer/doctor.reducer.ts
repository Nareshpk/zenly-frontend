import { DOCTOR_CREATE_REQUEST, DOCTOR_CREATE_SUCCESS, DOCTOR_CREATE_FAIL, DOCTOR_CREATE_RESET, DOCTOR_DETAILS_FAIL, DOCTOR_DETAILS_REQUEST, DOCTOR_DETAILS_SUCCESS, DOCTOR_STATUS_FAIL, DOCTOR_STATUS_REQUEST, DOCTOR_STATUS_SUCCESS, DOCTOR_UPDATE_FAIL, DOCTOR_UPDATE_REQUEST, DOCTOR_UPDATE_RESET, DOCTOR_UPDATE_SUCCESS, DOCTOR_LIST_FAIL, DOCTOR_LIST_REQUEST, DOCTOR_LIST_SUCCESS } from "../../constants/doctorConstants/doctor.types";


const initialState = {
  loading: false,
  success: false,
  doctor: null,
  error: null,
};

export const doctorCreateReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case DOCTOR_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };

    case DOCTOR_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        doctor: action.payload,
      };

    case DOCTOR_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case DOCTOR_CREATE_RESET:
      return initialState;

    default:
      return state;
  }
};

const doctorListInitialState = {
  loading: false,
  doctors: [],
  error: null,
};

export const doctorListReducer = (
  state = doctorListInitialState,
  action: any
) => {
  switch (action.type) {
    case DOCTOR_LIST_REQUEST:
      return { ...state, loading: true };

    case DOCTOR_LIST_SUCCESS:
      return { loading: false, doctors: action.payload };

    case DOCTOR_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};



const doctorDetailsInitialState = {
  loading: false,
  doctor: null,
  error: null,
};

export const doctorDetailsReducer = (
  state = doctorDetailsInitialState,
  action: any
) => {
  switch (action.type) {
    case DOCTOR_DETAILS_REQUEST:
      return { ...state, loading: true };

    case DOCTOR_DETAILS_SUCCESS:
      return { loading: false, doctor: action.payload };

    case DOCTOR_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


const doctorUpdateInitialState = {
  loading: false,
  success: false,
  doctor: null,
  error: null,
};

export const doctorUpdateReducer = (
  state = doctorUpdateInitialState,
  action: any
) => {
  switch (action.type) {
    case DOCTOR_UPDATE_REQUEST:
      return { loading: true };

    case DOCTOR_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        doctor: action.payload,
      };

    case DOCTOR_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DOCTOR_UPDATE_RESET:
      return doctorUpdateInitialState;

    default:
      return state;
  }
};

const doctorStatusInitialState = {
  loading: false,
  success: false,
  error: null,
};

export const doctorStatusReducer = (
  state = doctorStatusInitialState,
  action: any
) => {
  switch (action.type) {
    case DOCTOR_STATUS_REQUEST:
      return { loading: true };

    case DOCTOR_STATUS_SUCCESS:
      return { loading: false, success: true };

    case DOCTOR_STATUS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
