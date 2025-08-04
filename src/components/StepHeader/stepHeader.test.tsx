import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StepHeader from ".";
import { renderWithRedux } from "@/utils/testUtils";
import { vi } from "vitest";
import { logout } from "@/redux/slices/userSlice";
import { prevStep } from "@/redux/slices/stepSlice";
import type React from "react";

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick: () => void;
    }) => (
      <div data-testid="link" onClick={onClick}>
        {children}
      </div>
    ),
  };
});

const baseState = {
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

describe("StepHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Link to /login and dispatches logout on click when step is 1", async () => {
    const user = userEvent.setup();
    renderWithRedux(<StepHeader />, {
      preloadedState: {
        ...baseState,
        step: 1,
      },
    });

    const link = screen.getByTestId("link");
    await user.click(link);
    expect(mockDispatch).toHaveBeenCalledWith(logout());
  });

  it("renders back button and dispatches prevStep + navigates when step > 1", async () => {
    const user = userEvent.setup();
    renderWithRedux(<StepHeader />, {
      preloadedState: {
        ...baseState,
        step: 2,
      },
    });

    const button = screen.getByTestId("step-header__back-button");
    await user.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(prevStep());
    expect(mockNavigate).toHaveBeenCalledWith("/plans");
  });

  it("shows correct step label", () => {
    renderWithRedux(<StepHeader />, {
      preloadedState: {
        ...baseState,
        step: 2,
      },
    });

    expect(
      screen.getByText("Paso 2 de 2", { exact: false })
    ).toBeInTheDocument();
  });

  it("renders StepHeaderContent for each step", () => {
    renderWithRedux(<StepHeader />, {
      preloadedState: baseState,
    });

    expect(screen.getByText(/Planes y coberturas/i)).toBeInTheDocument();
    expect(screen.getByText(/Resumen/i)).toBeInTheDocument();
  });

  it("progress bar fill width is correct for step 2", () => {
    renderWithRedux(<StepHeader />, {
      preloadedState: {
        ...baseState,
        step: 2,
      },
    });

    const fill = screen.getByTestId("step-header__progress-fill");
    expect(fill).toHaveStyle("width: 100%");
  });
});
