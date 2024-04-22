const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_CURRENT_USER":
      return action.payload;
    case "UPDATE_CURRENT_USER":
      const { result, token } = action.payload;
      return { ...state, result: result, token: token };
    default:
      return state;
  }
};

export default currentUserReducer;
