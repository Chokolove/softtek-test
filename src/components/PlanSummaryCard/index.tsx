import type { Plan } from "@/types/plan";
import "./planSummaryCard.scss";
import iconHome from "../../assets/IcHomeLight.png";
import iconHospital from "../../assets/IcHospitalLight.png";

type PlanSummaryCardProps = {
  plan: Plan;
};

export default function PlanSummaryCard({ plan }: PlanSummaryCardProps) {
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
              <p className="plan-summary-card__price--text">
                ${plan.price} al mes
              </p>
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
      <button className="plan-summary-card__button">Seleccionar Plan</button>
    </div>
  );
}
