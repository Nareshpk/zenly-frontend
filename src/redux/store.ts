/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import local from "../utils/local";
import createRootReducer from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const initialState = {
  auth: local.getItem("auth") ? JSON.parse(local.getItem("auth") as any) : null,
  domainreducer: local.getItem("bearerToken")
    ? JSON.parse(local.getItem("bearerToken") as any)
    : null,
  router: undefined, // Add the router property to match the expected state shape
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const history = createBrowserHistory();
export default createStore(
  createRootReducer(history as any), // Cast history to any to avoid type issues
  initialState,
  // compose(applyMiddleware(routerMiddleware(history), thunk))
  composeEnhancer(applyMiddleware(routerMiddleware(history), thunk))
);
