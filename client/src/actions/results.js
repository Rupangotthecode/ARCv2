import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const submitResults =
  (
    id,
    loginID,
    name,
    score,
    totalScore,
    passed,
    testName,
    testCode,
    testLevel,
    testData,
    navigate
  ) =>
  async (dispatch) => {
    console.log(
      id,
      loginID,
      name,
      score,
      totalScore,
      passed,
      testName,
      testCode,
      testLevel,
      testData
    );
    try {
      const { data } = await api.submitResults(
        id,
        loginID,
        name,
        score,
        totalScore,
        passed,
        testName,
        testCode,
        testLevel,
        testData
      );
      dispatch({ type: "SUBMIT_RESULT", payload: data });
      dispatch(getResultWithId(data.resId));
      dispatch({ type: "AUTH_UPDATE", data: data.user });
      dispatch(
        setCurrentUser(JSON.parse(localStorage.getItem("Profile")), true)
      );
      navigate(`/result/${data.resId}`);
    } catch (error) {
      console.log(error);
    }
  };

export const getResultWithId = (resId) => async (dispatch) => {
  try {
    const { data } = await api.getResultWithId(resId);
    console.log(data);
    dispatch({ type: "GET_RESULT_WITH_ID", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllResults = (userId) => async (dispatch) => {
  try {
    if (userId) {
      const { data } = await api.getAllResults(userId);
      dispatch({ type: "GET_ALL_RESULTS", payload: data });
      dispatch({ type: "GET_FILTERED_RESULTS", payload: data.reverse() });
      console.log("in", data, userId);
    }
  } catch (error) {
    console.log(error);
  }
};

export const setResultsWithFilter = (results) => async (dispatch) => {
  try {
    dispatch({ type: "GET_FILTERED_RESULTS", payload: results });
    console.log("in", results);
  } catch (error) {
    console.log(error);
  }
};
