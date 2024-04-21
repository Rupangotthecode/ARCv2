const resultsReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "SUBMIT_RESULT":
      return { ...state };
    case "GET_RESULT_WITH_ID":
      return { ...state, data: action.payload };
    case "GET_ALL_RESULTS":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default resultsReducer;
