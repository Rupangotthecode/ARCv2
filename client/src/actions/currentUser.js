export const setCurrentUser = (data, update = false) => {
  if (update) {
    return {
      type: "UPDATE_CURRENT_USER",
      payload: data,
    };
  } else {
    return {
      type: "FETCH_CURRENT_USER",
      payload: data,
    };
  }
};
