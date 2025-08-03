import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

type InitialStateProps = {
  data: User;
};

const initialState: InitialStateProps = {
  data: {
    name: "",
    lastName: "",
    birthDay: "",
    docType: "",
    nroDoc: "",
    phone: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = initialState.data;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
