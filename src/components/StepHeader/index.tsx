import { useDispatch, useSelector } from "react-redux";
import "./stepHeader.scss";
import type { RootState } from "@/redux/store";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { logout } from "@/redux/slices/userSlice";
import StepHeaderContent from "../StepHeaderContent";
import { prevStep } from "@/redux/slices/stepSlice";

const STEPS = [
  {
    position: 1,
    text: "Planes y coberturas",
    link: "/plans",
  },
  {
    position: 2,
    text: "Resumen",
    link: "/summary",
  },
];

export default function StepHeader() {
  const currentStep = useSelector((state: RootState) => state.step);
  const dispatch = useDispatch();
  return (
    <div className="step-header">
      <div className="step-header__mobile">
        {currentStep === 1 ? (
          <Link
            to="/login"
            onClick={() => dispatch(logout())}
            className="step-header__circle step-header__back-button"
          >
            <div>
              <ChevronLeft
                height={12}
                width={12}
                color="#a9afd9"
                strokeWidth={4}
              />
            </div>
          </Link>
        ) : (
          <button
            className="step-header__circle step-header__back-button"
            onClick={() => dispatch(prevStep())}
          >
            <ChevronLeft
              height={12}
              width={12}
              color="#a9afd9"
              strokeWidth={4}
            />
          </button>
        )}
        <p className="step-header__text step-header__text--mobile">
          Paso {currentStep} de {STEPS.length}
        </p>
        <div className="step-header__progress-bar">
          <div
            className="step-header__progress-fill"
            style={{
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
      <div className="step-header__desktop">
        {STEPS.map((step, index) => (
          <div key={index} className="step-header__group">
            <StepHeaderContent
              currentStep={currentStep}
              position={step.position}
              text={step.text}
              link={step.link}
            />
            {index < STEPS.length - 1 && (
              <div
                className={clsx("step-header__line", {
                  "step-header__line--active": currentStep === step.position,
                })}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
