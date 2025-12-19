import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./reducers/authReducer.ts";
import { doctorProfileReducer } from "./reducers/doctorProfileReducer";
import { appointmentListReducer } from "./reducers/appointmentConstants";
import { doctorCreateReducer, doctorDetailsReducer, doctorListReducer, doctorStatusReducer, doctorUpdateReducer } from "./reducers/doctorReducer/doctor.reducer";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    // auth,
    auth: authReducer,
    doctor: doctorProfileReducer,
    appointmentList: appointmentListReducer,
    doctorCreate: doctorCreateReducer,
    doctorList: doctorListReducer,
    doctorDetails: doctorDetailsReducer,
    doctorUpdate: doctorUpdateReducer,
    doctorStatus: doctorStatusReducer,
  });

export default createRootReducer;