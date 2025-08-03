import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import beneficiaryReducer from "@/redux/slices/beneficiarySlice";
import type BeneficiaryOption from "@/types/beneficiaryOption";
import { MemoryRouter } from "react-router-dom";

export function renderWithRedux(
  ui: ReactNode,
  {
    preloadedState,
  }: {
    preloadedState?: {
      beneficiary: {
        data: BeneficiaryOption;
      };
    };
  } = {}
) {
  const store = configureStore({
    reducer: {
      beneficiary: beneficiaryReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}
