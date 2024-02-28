import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData); //send the user dat to the server and receive the corresponding token and acknowledgemnet for each individual profile data.
export const signUp = (authData) => API.post("/user/signup", authData);

export const postParentQues = (quesData) =>
  API.post("/user/PQsubmit", quesData);
