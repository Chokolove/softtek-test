import BrandBar from "@/components/BrandBar";
import StepHeader from "@/components/StepHeader";
import { useGetPlansQuery } from "@/redux/services/plansApi";

export default function Plans() {
  const { data: plans, isLoading, error } = useGetPlansQuery();
  console.log(plans);

  if (isLoading) return <p>Loading plans...</p>;
  if (error) return <p>Error loading plans.</p>;

  return (
    <div>
      <BrandBar />
      <StepHeader />
    </div>
  );
}
