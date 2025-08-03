import type { Plan } from "@/types/plan";
import "./planSummaryCard.scss";
import iconHome from "../../assets/IcHomeLight.png";
import iconHospital from "../../assets/IcHospitalLight.png";
import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPlan } from "@/redux/slices/planSlice";
import { setStep } from "@/redux/slices/stepSlice";
import { useNavigate } from "react-router-dom";

type PlanSummaryCardProps = {
  plan: Plan;
};

export default function PlanSummaryCard({ plan }: PlanSummaryCardProps) {
  const currentBeneficiaryPlan = useSelector(
    (state: RootState) => state.beneficiary
  );
  const hasDiscount = currentBeneficiaryPlan.data.id === 2;
  const price = hasDiscount ? plan.price * 0.95 : plan.price;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    const currentPlan = {
      name: plan.name,
      price: price,
      description: plan.description,
      age: plan.age,
    };

    dispatch(setPlan(currentPlan));
    dispatch(setStep(2));
    navigate("/summary");
  };
  return (
    <div className="plan-summary-card">
      <div className="plan-summary-card__container">
        {plan.price >= 80 ? (
          <div className="plan-summary-card__pill">Plan recomendado</div>
        ) : (
          <div className="plan-summary-card__pill--empty" />
        )}
        <div className="plan-summary-card__header">
          <div className="plan-summary-card__header--text">
            <p className="plan-summary-card__name">{plan.name}</p>
            <div className="plan-summary-card__price">
              <p className="plan-summary-card__price--label">Costo del plan</p>
              {hasDiscount ? (
                <>
                  <p className="plan-summary-card__price--text-discount">
                    ${plan.price} antes
                  </p>
                  <p className="plan-summary-card__price--text">
                    ${price} al mes
                  </p>
                </>
              ) : (
                <p className="plan-summary-card__price--text">
                  ${price} al mes
                </p>
              )}
            </div>
          </div>
          <img
            src={plan.price >= 80 ? iconHospital : iconHome}
            alt="People"
            className="plan-summary-card__icon"
          />
        </div>
        <div className="plan-summary-card__divider" />
        <ul className="plan-summary-card__description">
          {plan.description.map((description, index) => (
            <li key={index}>{description}</li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="plan-summary-card__button"
        onClick={() => handleClick()}
      >
        Seleccionar Plan
      </button>
    </div>
  );
}
