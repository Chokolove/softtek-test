import { useGetPlansQuery } from "@/redux/services/plansApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useMemo } from "react";
import { differenceInYears, parse } from "date-fns";
import "./plansSummary.scss";
import PlanSummaryCard from "../PlanSummaryCard";

export default function PlansSummary() {
  const currentBeneficiaryPlan = useSelector(
    (state: RootState) => state.beneficiary
  );
  const currentUser = useSelector((state: RootState) => state.user);
  const userBirthDay = useMemo(() => {
    if (!currentUser?.data?.birthDay) return null;
    return parse(currentUser.data.birthDay, "dd-MM-yyyy", new Date());
  }, [currentUser?.data?.birthDay]);

  const userAge = userBirthDay
    ? differenceInYears(new Date(), userBirthDay)
    : null;

  const shouldFetch = Boolean(currentBeneficiaryPlan?.data.id);

  const {
    data: plans,
    isLoading,
    error,
  } = useGetPlansQuery(undefined, {
    skip: !shouldFetch,
  });

  const ageEligiblePlans = useMemo(() => {
    if (!plans || userAge == null) return [];
    return plans.list.filter((plan) => plan.age >= userAge);
  }, [plans, userAge]);

  if (!shouldFetch) return null;
  if (isLoading) return <p>Loading plans...</p>;
  if (error) return <p>Error loading plans.</p>;

  return (
    <div className="plans-summary">
      {ageEligiblePlans.map((plan, index) => (
        <PlanSummaryCard key={index} plan={plan} />
      ))}
    </div>
  );
}
