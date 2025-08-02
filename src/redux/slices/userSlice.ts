import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

type InitialStateProps = {
  data: User | null;
};

const initialState: InitialStateProps = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
