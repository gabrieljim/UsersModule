import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

let initialState = {
  isLogged: false,
  user: {},
  error: ""
};

const loggedUser = JSON.parse(localStorage.getItem("user"));

if (loggedUser) {
  initialState = {
    isLogged: true,
    user: loggedUser,
    error: ""
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      cookies.set("token", action.payload.token, { path: "/" });
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.isLogged = true;
      state.user = action.payload.user;
      state.error = "";
    },
    logout: (state, action) => {
      cookies.remove("token");
      localStorage.removeItem("user");
      state.isLogged = false;
      state.user = {};
      state.error = action.payload;
    }
  }
});

export const { authenticate, logout } = authSlice.actions;

export default authSlice.reducer;
