import * as api from "../api";
import { setCurrentUser } from "./currentUser";

class CustomError extends Error {
  constructor(message, heading) {
    super(message);
    this.heading = heading;
  }
}

const generatePassword = (dob, name) => {
  // Extract day, month, and year from DOB
  const [year, month, day] = dob.split("-");

  const first_name = name.split(" ")[0];

  // Format the password using the provided name and DOB
  const password = `${first_name.toLowerCase()}${day}${month}${year}`;

  return password;
};

export const signup = (authData) => async (dispatch) => {
  try {
    const new_authData = {
      ...authData,
      password: generatePassword(authData.dob, authData.name),
    };
    console.log(new_authData);
    const { data } = await api.signUp(new_authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  } catch (error) {
    console.log(error.response.data.message);
    throw new CustomError(error.response.data.message, "Signup unsuccessful!");
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data, response } = await api.logIn(authData);
    console.log("inside login", response);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    if (navigate) {
      navigate("/Home");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new CustomError(error.response.data.message, "Login unsuccessful!");
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    console.log("inside logout");
    localStorage.removeItem("Profile");
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    if (navigate) {
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const persistLogin = () => async (dispatch) => {
  try {
    // const authData = JSON.parse(localStorage.getItem("Profile")).result;
    // console.log(authData);
    // dispatch(login(authData));
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  } catch (error) {}
};

export const postParentQues = (id, quesArray, navigate) => async (dispatch) => {
  try {
    console.log({ id, quesArray });
    const { data } = await api.postParentQues({ id, quesArray });
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/Home");
  } catch (error) {
    console.log(error);
  }
};

export const changeVolume = (id, volume) => async (dispatch) => {
  try {
    const { data } = await api.changeVolume({ id, volume });
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  } catch (error) {
    console.log(error);
  }
};
