import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { setStep } from "@/redux/slices/stepSlice";
import { renderWithRedux } from "@/utils/testUtils";
import StepHeaderContent from ".";

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
  };
});

const baseState = {
  plan: {
    data: {
      name: "Plan",
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
      name: "",
      lastName: "",
      birthDay: "",
      docType: "",
      docNumber: "",
      phone: "",
    },
  },
  step: 1,
};

function renderStepHeaderContent(
  props: {
    currentStep: number;
    position: number;
    text: string;
    link?: string;
  },
  overrideState = {}
) {
  return renderWithRedux(<StepHeaderContent {...props} />, {
    preloadedState: {
      ...baseState,
      ...overrideState,
      step: props.currentStep,
    },
  });
}

describe("StepHeaderContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches and navigates if it's the current step", async () => {
    const user = userEvent.setup();
    renderStepHeaderContent({
      currentStep: 1,
      position: 1,
      text: "Step 1",
    });

    await user.click(screen.getByRole("button", { name: /step 1/i }));

    expect(mockDispatch).toHaveBeenCalledWith(setStep(1));
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("dispatches and navigates if it's a previous step", async () => {
    const user = userEvent.setup();
    renderStepHeaderContent({
      currentStep: 3,
      position: 2,
      text: "Step 2",
    });

    await user.click(screen.getByRole("button", { name: /step 2/i }));

    expect(mockDispatch).toHaveBeenCalledWith(setStep(2));
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("dispatches and navigates if it's the next step and has a plan", async () => {
    const user = userEvent.setup();
    renderStepHeaderContent({
      currentStep: 1,
      position: 2,
      text: "Step 2",
    });

    await user.click(screen.getByRole("button", { name: /step 2/i }));

    expect(mockDispatch).toHaveBeenCalledWith(setStep(2));
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("does NOT dispatch or navigate if it's the next step and there's no plan", async () => {
    const user = userEvent.setup();
    renderStepHeaderContent(
      {
        currentStep: 1,
        position: 2,
        text: "Step 2",
      },
      {
        plan: {
          data: {
            name: "",
          },
        },
      }
    );

    await user.click(screen.getByRole("button", { name: /step 2/i }));

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("adds the active class when it's the current step", () => {
    renderStepHeaderContent({
      currentStep: 2,
      position: 2,
      text: "Step 2",
    });

    const button = screen.getByRole("button", { name: /step 2/i });
    expect(button).toHaveClass("step-header__content--active");
  });
});
