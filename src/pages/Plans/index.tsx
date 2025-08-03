import BrandBar from "@/components/BrandBar";
import StepHeader from "@/components/StepHeader";
import { useGetPlansQuery } from "@/redux/services/plansApi";
import { logout } from "@/redux/slices/userSlice";
import { ChevronLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./plans.scss";
import type { RootState } from "@/redux/store";
import PlansHeaderSection from "@/components/PlansHeaderSection";

const BENEFICIARY_OPTIONS = [
  {
    icon: "IcProtectionLight",
    title: "Para mi",
    text: "Cotiza tu seguro de salud y agrega familiares si así lo deseas.",
  },
  {
    icon: "IcAddUserLight",
    title: "Para alguien más",
    text: "Realiza una cotización para uno de tus familiares o cualquier persona.",
  },
];

export default function Plans() {
  const { data: plans, isLoading, error } = useGetPlansQuery();
  const currentUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  if (isLoading) return <p>Loading plans...</p>;
  if (error) return <p>Error loading plans.</p>;

  return (
    <div>
      <BrandBar />
      <StepHeader />
      <div className="plans">
        <Link
          to="/login"
          onClick={() => dispatch(logout())}
          className="plans__back-button"
        >
          <div className="plans__back-button--icon">
            <ChevronLeft
              height={12}
              width={12}
              color="#4f4fff"
              strokeWidth={4}
            />
          </div>
          Volver
        </Link>
        <PlansHeaderSection
          name={currentUser.data.name}
          beneficiaryOptions={BENEFICIARY_OPTIONS}
        />
      </div>
    </div>
  );
}
