import * as api from "../api";

export const getDBJson = (testType, content) => async (dispatch) => {
  try {
    const { data } = await api.getDBJson(testType, content);
    dispatch({ type: "GET_DBJSON", payload: data });
  } catch (error) {
    console.log("error while getting dbjson", error);
  }
};
