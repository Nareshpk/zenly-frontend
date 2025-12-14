import { APPOINTMENT_LIST_FAIL, APPOINTMENT_LIST_REQUEST, APPOINTMENT_LIST_RESET, APPOINTMENT_LIST_SUCCESS } from "../actions/appointmentActions";

type AppointmentState = {
  loading: boolean;
  appointments: any[];
  error?: string;
};

const initialState: AppointmentState = {
  loading: false,
  appointments: [],
};

export const appointmentListReducer = (
  state = initialState,
  action: any
): AppointmentState => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case APPOINTMENT_LIST_SUCCESS:
      return {
        loading: false,
        appointments: action.payload || [],
      };

    case APPOINTMENT_LIST_FAIL:
      return {
        loading: false,
        appointments: [],
        error: action.payload,
      };

    case APPOINTMENT_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};
