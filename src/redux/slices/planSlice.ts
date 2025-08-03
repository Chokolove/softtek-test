import type { Plan } from "@/types/plan";
import { createSlice } from "@reduxjs/toolkit";

type InitialStateProps = {
  data: Plan;
};

const initialState: InitialStateProps = {
  data: {
    name: "",
    price: 0,
    description: [],
    age: 0,
  },
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPlan } = planSlice.actions;
export default planSlice.reducer;
