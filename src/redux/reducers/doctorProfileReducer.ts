import { DOCTOR_LIST_FAIL, DOCTOR_LIST_REQUEST, DOCTOR_LIST_SUCCESS } from "../actions/doctorProfileAction";


type DoctorState = {
  allDoctors: any[];
  loading: boolean;
  error: string | null;
};

const initialState: DoctorState = {
  allDoctors: [],
  loading: false,
  error: null,
};

export const doctorProfileReducer = (
  state = initialState,
  action: any
): DoctorState => {
  switch (action.type) {
    case DOCTOR_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DOCTOR_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        allDoctors: action.payload, // 👈 IMPORTANT
      };

    case DOCTOR_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
