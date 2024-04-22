import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import resultsReducer from "./results";
import allResultsReducer from "./allResults";

export default combineReducers({
  authReducer,
  currentUserReducer,
  resultsReducer,
  allResultsReducer,
});
