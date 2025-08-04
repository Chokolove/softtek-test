import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useGetPlansQuery } from "@/redux/services/plansApi";
import { filterAgeEligiblePlans } from "@/utils/planUtils";
import PlanSummaryCard from "@/components/PlanSummaryCard";
import { getAge, parseBirthday } from "@/utils/dateUtils";
import "./plansSummary.scss";

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

  const userBirthDay = useMemo(
    () => parseBirthday(currentUser?.data?.birthDay ?? ""),
    [currentUser?.data?.birthDay]
  );
  const userAge = useMemo(() => getAge(userBirthDay), [userBirthDay]);

  const shouldFetch = Boolean(currentBeneficiaryPlan?.data.id);

  const {
    data: plans,
    isLoading,
    error,
  } = useGetPlansQuery(undefined, {
    skip: !shouldFetch,
  });

  const ageEligiblePlans = useMemo(() => {
    return filterAgeEligiblePlans(plans?.list ?? [], userAge);
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
