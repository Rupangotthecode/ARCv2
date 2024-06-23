const allResultsReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "GET_ALL_RESULTS":
      return { ...state, data: action.payload };
    case "GET_FILTERED_RESULTS":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default allResultsReducer;
