import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import beneficiaryReducer from "@/redux/slices/beneficiarySlice";
import userReducer from "@/redux/slices/userSlice";
import type BeneficiaryOption from "@/types/beneficiaryOption";
import { MemoryRouter } from "react-router-dom";
import type { User } from "@/types/user";
import { plansApi } from "@/redux/services/plansApi";
import { vi } from "vitest";

type PreloadedState = {
  beneficiary: { data: BeneficiaryOption };
  user: { data: User };
};

export function createMockQueryResult<T>({
  data,
  isLoading = false,
  isError = false,
  error = undefined,
}: {
  data?: T;
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
}) {
  return {
    data,
    isLoading,
    isError,
    isSuccess: !!data && !isError,
    isUninitialized: false,
    error,
    refetch: vi.fn(),
    fulfilledTimeStamp: 0,
    originalArgs: undefined,
  };
}

export function renderWithRedux(
  ui: ReactNode,
  { preloadedState }: { preloadedState?: PreloadedState } = {}
) {
  const store = configureStore({
    reducer: {
      beneficiary: beneficiaryReducer,
      user: userReducer,
      [plansApi.reducerPath]: plansApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(plansApi.middleware),
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}
