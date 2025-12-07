import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    // auth,
 
  });

export default createRootReducer;