import { vi } from "vitest";
import { screen } from "@testing-library/react";
import * as plansApi from "@/redux/services/plansApi";
import { createMockQueryResult, renderWithRedux } from "@/utils/testUtils";
import PlansSummary from ".";
import type { Plan } from "@/types/plan";

vi.mock("@/components/PlanSummaryCard", () => ({
  default: ({ plan }: { plan: Plan }) => (
    <div data-testid={plan.name}>{plan.name}</div>
  ),
}));

vi.mock("embla-carousel-react", () => {
  return {
    default: () => [
      () => null,
      {
        selectedScrollSnap: () => 0,
        scrollPrev: vi.fn(),
        scrollNext: vi.fn(),
        on: vi.fn(),
      },
    ],
  };
});

describe("PlansSummary", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const preloadedState: {
    beneficiary: {
      data: {
        id: number;
        icon: string;
        title: string;
        text: string;
      };
    };
    user: {
      data: {
        birthDay: string;
        name: string;
        lastName: string;
        docType: string;
        docNumber: string;
        phone: string;
      };
    };
  } = {
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
        birthDay: "15-04-2000",
        name: "",
        lastName: "",
        docType: "",
        docNumber: "",
        phone: "",
      },
    },
  };

  it("renders nothing when shouldFetch is false", () => {
    const { container } = renderWithRedux(<PlansSummary />, {
      preloadedState: {
        user: { ...preloadedState.user },
        beneficiary: {
          ...preloadedState.beneficiary,
          data: { ...preloadedState.beneficiary.data, id: 0 },
        },
      },
    });

    expect(container).toBeEmptyDOMElement();
  });

  it("shows loading state", () => {
    vi.spyOn(plansApi, "useGetPlansQuery").mockReturnValue(
      createMockQueryResult({
        isLoading: true,
      })
    );

    renderWithRedux(<PlansSummary />, {
      preloadedState,
    });

    expect(screen.getByText(/loading plans/i)).toBeInTheDocument();
  });

  it("shows error message when query fails", () => {
    vi.spyOn(plansApi, "useGetPlansQuery").mockReturnValue(
      createMockQueryResult({
        error: true,
      })
    );

    renderWithRedux(<PlansSummary />, {
      preloadedState,
    });

    expect(screen.getByText(/error loading plans/i)).toBeInTheDocument();
  });

  it("renders eligible plans", () => {
    vi.spyOn(plansApi, "useGetPlansQuery").mockReturnValue(
      createMockQueryResult<{ list: Plan[] }>({
        data: {
          list: [
            {
              name: "Plan A",
              age: 18,
              price: 0,
              description: [],
            },
            {
              name: "Plan B",
              age: 25,
              price: 0,
              description: [],
            },
          ],
        },
      })
    );

    renderWithRedux(<PlansSummary />, {
      preloadedState,
    });

    expect(screen.getAllByTestId("Plan B")[0]).toBeInTheDocument();
  });
});
