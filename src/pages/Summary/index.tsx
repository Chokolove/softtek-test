import BrandBar from "@/components/BrandBar";
import "./summary.scss";
import StepHeader from "@/components/StepHeader";
import { ChevronLeft, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetStep } from "@/redux/slices/stepSlice";
import type { RootState } from "@/redux/store";
import { useEffect } from "react";

export default function Resume() {
  const currentUser = useSelector((state: RootState) => state.user);
  const currentPlan = useSelector((state: RootState) => state.plan);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(resetStep());
  };

  useEffect(() => {
    if (!currentPlan) {
      navigate("/plans");
    }
  }, [currentPlan, navigate]);
  return (
    <div>
      <BrandBar />
      <StepHeader />
      <div className="summary">
        <Link
          to="/plans"
          type="button"
          onClick={() => handleClick()}
          className="summary__back-button"
        >
          <div className="summary__back-button--icon">
            <ChevronLeft
              height={12}
              width={12}
              color="#4f4fff"
              strokeWidth={4}
            />
          </div>
          Volver
        </Link>
        <div className="summary__container">
          <h2 className="summary__title">Resumen del seguro </h2>
          <div className="summary__card">
            <div className="summary__user">
              <p className="summary__user-label">Precios calculados para:</p>
              <p className="summary__user-text">
                <Users />
                {currentUser.data.name} {currentUser.data.lastName}
              </p>
            </div>
            <div className="summary__divider" />
            <div className="summary__billing-contact">
              <p className="summary__billing-contact-label">
                Responsable de pago
              </p>
              <p className="summary__billing-contact-text summary__billing-contact-text--uppercase">
                {currentUser.data.docType}: {currentUser.data.docNumber}
              </p>
              <p className="summary__billing-contact-text">
                Celular: {currentUser.data.phone}
              </p>
            </div>
            <div className="summary__plan">
              <p className="summary__plan-label">Plan elegido</p>
              <p className="summary__plan-text">{currentPlan.data.name}</p>
              <p className="summary__plan-text">
                Costo del Plan: ${currentPlan.data.price} al mes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
