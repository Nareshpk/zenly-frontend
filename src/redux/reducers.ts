import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./reducers/authReducer.ts";
import { doctorProfileReducer } from "./reducers/doctorProfileReducer";
import { appointmentListReducer } from "./reducers/appointmentConstants";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    // auth,
    auth: authReducer,
    doctor: doctorProfileReducer,
    appointmentList: appointmentListReducer,
  });

export default createRootReducer;