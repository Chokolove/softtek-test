import Plans from "@/pages/Plans";
import * as planSlice from "@/redux/slices/planSlice";
import * as userSlice from "@/redux/slices/userSlice";
import { baseState, renderWithRedux } from "@/utils/testUtils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("Plans Page", () => {
  it("dispatches resetPlan on mount", () => {
    const resetPlanSpy = vi.spyOn(planSlice, "resetPlan");

    renderWithRedux(<Plans />, { preloadedState: baseState });

    expect(resetPlanSpy).toHaveBeenCalled();
  });

  it('dispatches logout when "Volver" link is clicked', async () => {
    const logoutSpy = vi.spyOn(userSlice, "logout");
    const user = userEvent.setup();

    renderWithRedux(<Plans />, { preloadedState: baseState });

    const volverLink = screen.getByRole("link", { name: /volver/i });
    await user.click(volverLink);

    expect(logoutSpy).toHaveBeenCalled();
  });
});
