const dbJsonReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "GET_DBJSON":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default dbJsonReducer;
