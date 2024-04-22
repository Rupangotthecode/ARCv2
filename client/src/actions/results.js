import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const submitResults =
  (
    id,
    loginID,
    name,
    score,
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
    const { data } = await api.getAllResults(userId);
    dispatch({ type: "GET_ALL_RESULTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
