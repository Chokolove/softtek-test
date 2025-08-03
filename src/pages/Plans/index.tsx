import BrandBar from "@/components/BrandBar";
import StepHeader from "@/components/StepHeader";
import { logout } from "@/redux/slices/userSlice";
import { ChevronLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./plans.scss";
import type { RootState } from "@/redux/store";
import PlansHeaderSection from "@/components/PlansHeaderSection";
import PlansSummary from "@/components/PlansSummary";
import type BeneficiaryOption from "@/types/beneficiaryOption";
import { useEffect } from "react";
import { resetPlan } from "@/redux/slices/planSlice";

const BENEFICIARY_OPTIONS: BeneficiaryOption[] = [
  {
    id: 1,
    icon: "IcProtectionLight",
    title: "Para mi",
    text: "Cotiza tu seguro de salud y agrega familiares si así lo deseas.",
  },
  {
    id: 2,
    icon: "IcAddUserLight",
    title: "Para alguien más",
    text: "Realiza una cotización para uno de tus familiares o cualquier persona.",
  },
];

export default function Plans() {
  const currentUser = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetPlan());
  }, [dispatch, location]);

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
        <PlansSummary />
      </div>
    </div>
  );
}
