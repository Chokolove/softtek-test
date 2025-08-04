import type { Plan } from "@/types/plan";

export function filterAgeEligiblePlans(
  plans: Plan[],
  userAge: number | null
): Plan[] {
  if (userAge == null) return [];
  return plans.filter((plan) => plan.age >= userAge);
}
