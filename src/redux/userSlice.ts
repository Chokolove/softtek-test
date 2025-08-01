import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../types/user";

type initialStateProps = {
  user: User | null;
};

const initialState: initialStateProps = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
