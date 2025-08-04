import clsx from "clsx";
import "./stepHeaderContent.scss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { setStep } from "@/redux/slices/stepSlice";
import { useNavigate } from "react-router-dom";

type StepHeaderContentProps = {
  currentStep: number;
  position: number;
  text: string;
  link?: string;
};
export default function StepHeaderContent({
  currentStep,
  position,
  text,
  link,
}: StepHeaderContentProps) {
  const currentPlan = useSelector((state: RootState) => state.plan);
  const dispatch = useDispatch();
  const isCurrent = currentStep === position;
  const isPrevious = position < currentStep;
  const isNext = position === currentStep + 1;
  const hasPlan = !!currentPlan.data.name;

  const canGoToStep = isCurrent || isPrevious || (isNext && hasPlan);

  const navigate = useNavigate();

  const handleClick = () => {
    if (canGoToStep) {
      dispatch(setStep(position));
      navigate(link ?? "/");
    }
  };

  return (
    <button
      className={clsx("step-header__content step-header__button", {
        "step-header__content--active": currentStep === position,
      })}
      onClick={handleClick}
    >
      <div className="step-header__circle">
        <p className="step-header__step-number">{position}</p>
      </div>
      <p className="step-header__text">{text}</p>
    </button>
  );
}
