import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import resultsReducer from "./results";
import allResultsReducer from "./allResults";
import filteredResultsReducer from "./filteredResults";
import dbJsonReducer from "./dbJson";

export default combineReducers({
  authReducer,
  currentUserReducer,
  resultsReducer,
  allResultsReducer,
  filteredResultsReducer,
  dbJsonReducer,
});
