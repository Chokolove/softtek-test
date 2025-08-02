import type { Plan } from "@/types/plan";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Plan | null = null;

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action) => (state = action.payload),
  },
});

export const { setPlan } = planSlice.actions;
export default planSlice.reducer;
