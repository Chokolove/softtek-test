import type BeneficiaryOption from "@/types/beneficiaryOption";
import "./beneficiaryCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { setBeneficiary } from "@/redux/slices/beneficiarySlice";
import type { RootState } from "@/redux/store";
import { useCallback } from "react";

export default function BeneficiaryCard({
  id,
  icon,
  title,
  text,
}: BeneficiaryOption) {
  const currentBeneficiary = useSelector(
    (state: RootState) => state.beneficiary.data
  );
  const dispatch = useDispatch();
  const handleCheck = useCallback(() => {
    dispatch(setBeneficiary({ id, icon, title, text }));
  }, [dispatch, id, icon, title, text]);
  return (
    <div className="beneficiary-card">
      <label className="beneficiary-card__radio-label">
        <input
          type="radio"
          className="beneficiary-card__radio"
          checked={currentBeneficiary.icon === icon}
          onChange={() => handleCheck()}
        />
        <span className="beneficiary-card__circle" />
      </label>
      <div className="beneficiary-card__container">
        <div className="beneficiary-card__header">
          <img
            src={`/${icon}.png`}
            alt="People"
            className="beneficiary-card__image"
          />
          <h3 className="beneficiary-card__title">{title}</h3>
        </div>
        <p className="beneficiary-card__text">{text}</p>
      </div>
    </div>
  );
}
