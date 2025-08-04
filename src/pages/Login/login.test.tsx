import Login from "@/pages/Login";
import * as userSlice from "@/redux/slices/userSlice";
import * as planSlice from "@/redux/slices/planSlice";
import * as stepSlice from "@/redux/slices/stepSlice";
import * as beneficiarySlice from "@/redux/slices/beneficiarySlice";
import { baseState, renderWithRedux } from "@/utils/testUtils";
import { vi } from "vitest";

describe("Login Page", () => {
  it("dispatches logout and resets state slices on mount", () => {
    const logoutSpy = vi.spyOn(userSlice, "logout");
    const resetPlanSpy = vi.spyOn(planSlice, "resetPlan");
    const resetStepSpy = vi.spyOn(stepSlice, "resetStep");
    const resetBeneficiarySpy = vi.spyOn(beneficiarySlice, "resetBeneficiary");

    renderWithRedux(<Login />, { preloadedState: baseState });

    expect(logoutSpy).toHaveBeenCalled();
    expect(resetPlanSpy).toHaveBeenCalled();
    expect(resetStepSpy).toHaveBeenCalled();
    expect(resetBeneficiarySpy).toHaveBeenCalled();
  });
});
