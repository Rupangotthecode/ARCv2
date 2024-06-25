const filteredResultsReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "GET_FILTERED_RESULTS":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default filteredResultsReducer;
