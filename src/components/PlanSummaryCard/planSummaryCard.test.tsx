import { renderWithRedux } from "@/utils/testUtils";
import type { Plan } from "@/types/plan";
import { screen } from "@testing-library/react";
import PlanSummaryCard from ".";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

const mockPlan: Plan = {
  name: "Plan A",
  age: 18,
  price: 100,
  description: ["description 1", "description 2"],
};

describe("PlanSummaryCard", () => {
  describe("renders contents", () => {
    test("renders the plan name", () => {
      renderWithRedux(<PlanSummaryCard plan={mockPlan} />);
      expect(screen.getByText(/Plan A/i)).toBeInTheDocument();
    });
    test("renders the plan price", () => {
      renderWithRedux(<PlanSummaryCard plan={mockPlan} />);
      const price = screen.getByTestId("price");
      expect(price).toHaveTextContent("$100 al mes");
    });
    test("renders the plan description", () => {
      renderWithRedux(<PlanSummaryCard plan={mockPlan} />);
      expect(screen.getByText(/description 1/i)).toBeInTheDocument();
      expect(screen.getByText(/description 2/i)).toBeInTheDocument();
    });
  });
  describe("renders content with beneficiary", () => {
    test("renders original price", () => {
      renderWithRedux(<PlanSummaryCard plan={mockPlan} />, {
        preloadedState: {
          beneficiary: {
            data: {
              id: 2,
              icon: "",
              title: "",
              text: "",
            },
          },
          user: {
            data: {
              birthDay: "",
              name: "",
              lastName: "",
              docType: "",
              docNumber: "",
              phone: "",
            },
          },
        },
      });
      const originalPrice = screen.getByTestId("original-price");
      expect(originalPrice).toHaveTextContent("$100 antes");
    });
    test("renders discounted price", () => {
      renderWithRedux(<PlanSummaryCard plan={mockPlan} />, {
        preloadedState: {
          beneficiary: {
            data: {
              id: 2,
              icon: "",
              title: "",
              text: "",
            },
          },
          user: {
            data: {
              birthDay: "",
              name: "",
              lastName: "",
              docType: "",
              docNumber: "",
              phone: "",
            },
          },
        },
      });
      const discountedPrice = screen.getByTestId("price");
      expect(discountedPrice).toHaveTextContent("$95 al mes");
    });
  });
  describe("redux managment", () => {
    test("Dispatchs setPlan", async () => {
      const user = userEvent.setup();
      renderWithRedux(<PlanSummaryCard plan={mockPlan} />, {
        preloadedState: {
          beneficiary: {
            data: {
              id: 1,
              icon: "",
              title: "",
              text: "",
            },
          },
          user: {
            data: {
              birthDay: "",
              name: "",
              lastName: "",
              docType: "",
              docNumber: "",
              phone: "",
            },
          },
        },
      });

      const button = screen.getByRole("button");
      await user.click(button);

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "plan/setPlan",
          payload: expect.objectContaining(mockPlan),
        })
      );
    });
  });
});
