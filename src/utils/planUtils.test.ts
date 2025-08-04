import { describe, it, expect } from "vitest";
import { filterAgeEligiblePlans } from "./planUtils";
import type { Plan } from "@/types/plan";

const mockPlans: Plan[] = [
  { name: "Plan A", age: 18, price: 100, description: [] },
  { name: "Plan B", age: 25, price: 70, description: [] },
  { name: "Plan C", age: 30, price: 20, description: [] },
];

describe("filterAgeEligiblePlans", () => {
  it("returns only plans that match or exceed the user's age", () => {
    const result = filterAgeEligiblePlans(mockPlans, 25);
    expect(result).toEqual([
      { name: "Plan B", age: 25, price: 70, description: [] },
      { name: "Plan C", age: 30, price: 20, description: [] },
    ]);
  });

  it("returns all plans if user is very young", () => {
    const result = filterAgeEligiblePlans(mockPlans, 10);
    expect(result).toEqual(mockPlans);
  });

  it("returns an empty array if userAge is null", () => {
    const result = filterAgeEligiblePlans(mockPlans, null);
    expect(result).toEqual([]);
  });

  it("returns an empty array if there are no plans", () => {
    const result = filterAgeEligiblePlans([], 25);
    expect(result).toEqual([]);
  });
});
