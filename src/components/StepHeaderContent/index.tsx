import clsx from "clsx";
import "./StepHeaderContent.scss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { setStep } from "@/redux/slices/stepSlice";

type StepHeaderContentProps = {
  currentStep: number;
  position: number;
  text: string;
};
export default function StepHeaderContent({
  currentStep,
  position,
  text,
}: StepHeaderContentProps) {
  const currentPlan = useSelector((state: RootState) => state.plan);
  const dispatch = useDispatch();
  const isDisabled = position === 2 && !currentPlan;

  const handleClick = () => {
    dispatch(setStep(position));
    if (!isDisabled) {
      dispatch(setStep(position));
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
