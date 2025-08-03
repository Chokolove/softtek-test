import type BeneficiaryOption from "@/types/beneficiaryOption";
import { createSlice } from "@reduxjs/toolkit";

type InitialStateProps = {
  data: BeneficiaryOption;
};

const initialState: InitialStateProps = {
  data: {
    id: 0,
    icon: "",
    title: "",
    text: "",
  },
};
const beneficiarySlice = createSlice({
  name: "beneficiary",
  initialState,
  reducers: {
    setBeneficiary: (state, action) => {
      state.data = action.payload;
    },
    resetBeneficiary: () => initialState,
  },
});

export const { setBeneficiary, resetBeneficiary } = beneficiarySlice.actions;
export default beneficiarySlice.reducer;
