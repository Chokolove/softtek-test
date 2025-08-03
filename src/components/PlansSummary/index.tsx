import { useGetPlansQuery } from "@/redux/services/plansApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInYears, parse } from "date-fns";
import "./plansSummary.scss";
import PlanSummaryCard from "../PlanSummaryCard";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PlansSummary() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

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

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!shouldFetch) return null;
  if (isLoading) return <p>Loading plans...</p>;
  if (error) return <p>Error loading plans.</p>;

  return (
    <>
      <div className="plans-summary">
        {ageEligiblePlans.map((plan, index) => (
          <PlanSummaryCard key={index} plan={plan} />
        ))}
      </div>
      <div className="plans-summary--mobile">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {ageEligiblePlans.map((plan, index) => (
              <div className="embla__slide" key={index}>
                <PlanSummaryCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
        <div className="embla__controls">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="embla__button embla__button--prev"
          >
            <ChevronLeft
              height={15}
              width={15}
              color="#4f4fff"
              strokeWidth={2}
            />
          </button>
          <span className="embla__counter">
            {selectedIndex + 1} / {ageEligiblePlans.length}
          </span>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="embla__button embla__button--next"
          >
            <ChevronRight
              height={15}
              width={15}
              color="#4f4fff"
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </>
  );
}
