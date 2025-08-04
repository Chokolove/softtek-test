import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import beneficiaryReducer from "@/redux/slices/beneficiarySlice";
import userReducer from "@/redux/slices/userSlice";
import planReducer from "@/redux/slices/planSlice";
import stepReducer from "@/redux/slices/stepSlice";
import type BeneficiaryOption from "@/types/beneficiaryOption";
import { MemoryRouter } from "react-router-dom";
import type { User } from "@/types/user";
import { plansApi } from "@/redux/services/plansApi";
import { vi } from "vitest";
import type { Plan } from "@/types/plan";

type PreloadedState = {
  beneficiary: { data: BeneficiaryOption };
  user: { data: User };
  plan: { data: Plan };
  step: number;
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
      plan: planReducer,
      step: stepReducer,
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

export const baseState = {
  plan: {
    data: {
      name: "Plan A",
      price: 0,
      description: [],
      age: 0,
    },
  },
  beneficiary: {
    data: {
      id: 0,
      icon: "",
      title: "",
      text: "",
    },
  },
  user: {
    data: {
      name: "Test",
      lastName: "",
      birthDay: "",
      docType: "",
      docNumber: "123",
      phone: "",
    },
  },
  step: 1,
};
