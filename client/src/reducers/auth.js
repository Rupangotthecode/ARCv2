const authReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data };
    case "AUTH_UPDATE":
      const prevUserString = localStorage.getItem("Profile");
      const prevUser = JSON.parse(prevUserString);

      // Check if the parsed JSON is an object
      const updatedUser =
        typeof prevUser === "object"
          ? { ...prevUser, result: action?.data }
          : { result: action?.data };

      localStorage.setItem("Profile", JSON.stringify(updatedUser));
      return { ...state, data: action?.data };
    default:
      return state;
  }
};

export default authReducer;
