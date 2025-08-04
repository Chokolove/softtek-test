import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as stepSlice from "@/redux/slices/stepSlice";
import { vi } from "vitest";
import { baseState, renderWithRedux } from "@/utils/testUtils";
import Summary from ".";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Resume Page", () => {
  it("redirects to /plans if currentPlan is missing", () => {
    const stateWithoutPlan = {
      ...baseState,
      plan: { data: { name: "", price: 0, description: [], age: 0 } },
    };

    renderWithRedux(<Summary />, { preloadedState: stateWithoutPlan });

    expect(mockNavigate).toHaveBeenCalledWith("/plans");
  });

  it("dispatches resetStep when back button is clicked", async () => {
    const resetStepSpy = vi.spyOn(stepSlice, "resetStep");
    const user = userEvent.setup();

    renderWithRedux(<Summary />, { preloadedState: baseState });

    const backButton = screen.getByRole("link", { name: /volver/i });
    await user.click(backButton);

    expect(resetStepSpy).toHaveBeenCalled();
  });

  it("renders user and plan information", () => {
    renderWithRedux(<Summary />, {
      preloadedState: {
        ...baseState,
        step: 2,
        plan: { data: { name: "Plan A", price: 10, description: [], age: 0 } },
        user: {
          data: {
            name: "Test",
            lastName: "McTest",
            birthDay: "01-01-2001",
            docType: "dni",
            docNumber: "12345678",
            phone: "999999999",
          },
        },
      },
    });

    expect(screen.getByText("Test McTest")).toBeInTheDocument();
    expect(screen.getByText("dni: 12345678")).toBeInTheDocument();
    expect(screen.getByText("Celular: 999999999")).toBeInTheDocument();

    expect(screen.getByText("Plan A")).toBeInTheDocument();
    expect(screen.getByText("Costo del Plan: $10 al mes")).toBeInTheDocument();
  });
});
