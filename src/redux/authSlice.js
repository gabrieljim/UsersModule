import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    token: null
  },
  reducers: {
    authenticate: (state, action) => {
      state.isLogged = true;
      state.token = action.payload;
    }
  }
});

export const { authenticate } = authSlice.actions;

export default authSlice.reducer;
