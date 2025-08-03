import { createSlice } from "@reduxjs/toolkit";

const stepSlice = createSlice({
  name: "step",
  initialState: 1,
  reducers: {
    nextStep: (state) => state + 1,
    prevStep: (state) => state - 1,
    setStep: (state, action) => (state = action.payload),
    resetStep: () => 1,
  },
});

export const { nextStep, prevStep, setStep, resetStep } = stepSlice.actions;
export default stepSlice.reducer;
