import * as api from "../api";

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
