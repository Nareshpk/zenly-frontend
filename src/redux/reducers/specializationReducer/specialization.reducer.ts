import { SPECIALIZATION_CREATE_REQUEST, SPECIALIZATION_CREATE_SUCCESS, SPECIALIZATION_CREATE_FAIL, SPECIALIZATION_CREATE_RESET, SPECIALIZATION_LIST_REQUEST, SPECIALIZATION_LIST_SUCCESS, SPECIALIZATION_LIST_FAIL, SPECIALIZATION_UPDATE_REQUEST, SPECIALIZATION_UPDATE_SUCCESS, SPECIALIZATION_UPDATE_FAIL, SPECIALIZATION_DELETE_REQUEST, SPECIALIZATION_DELETE_SUCCESS, SPECIALIZATION_DELETE_FAIL, SPECIALIZATION_TOGGLE_REQUEST, SPECIALIZATION_TOGGLE_SUCCESS, SPECIALIZATION_TOGGLE_FAIL, SPECIALIZATION_DETAILS_FAIL, SPECIALIZATION_DETAILS_REQUEST, SPECIALIZATION_DETAILS_SUCCESS } from "../../constants/specializationConstants/specializationConstants";


/* ================= CREATE ================= */
export const specializationCreateReducer = (
  state = {},
  action: any
) => {
  switch (action.type) {
    case SPECIALIZATION_CREATE_REQUEST:
      return { loading: true };
    case SPECIALIZATION_CREATE_SUCCESS:
      return { loading: false, success: true };
    case SPECIALIZATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SPECIALIZATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

/* ================= LIST ================= */
export const specializationListReducer = (
  state = { loading: false, specializations: [] },
  action: any
) => {
  switch (action.type) {
    case SPECIALIZATION_LIST_REQUEST:
      return { loading: true, specializations: [] };
    case SPECIALIZATION_LIST_SUCCESS:
      return { loading: false, specializations: action.payload };
    case SPECIALIZATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

/* ================= UPDATE ================= */
export const specializationUpdateReducer = (
  state = {},
  action: any
) => {
  switch (action.type) {
    case SPECIALIZATION_UPDATE_REQUEST:
      return { loading: true };
    case SPECIALIZATION_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SPECIALIZATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

/* ================= DELETE ================= */
export const specializationDeleteReducer = (
  state = {},
  action: any
) => {
  switch (action.type) {
    case SPECIALIZATION_DELETE_REQUEST:
      return { loading: true };
    case SPECIALIZATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SPECIALIZATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

/* ================= TOGGLE ================= */
export const specializationToggleReducer = (
  state = {},
  action: any
) => {
  switch (action.type) {
    case SPECIALIZATION_TOGGLE_REQUEST:
      return { loading: true };
    case SPECIALIZATION_TOGGLE_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case SPECIALIZATION_TOGGLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const specializationDetailsReducer = (
  state = { loading: true, specialization: null },
  action: any
) => {
  switch (action.type) {
    case SPECIALIZATION_DETAILS_REQUEST:
      return { loading: true };

    case SPECIALIZATION_DETAILS_SUCCESS:
      return {
        loading: false,
        specialization: action.payload,
      };

    case SPECIALIZATION_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};