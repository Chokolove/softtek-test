import type BeneficiaryOption from "@/types/beneficiaryOption";
import "./plansHeaderSection.scss";
import BeneficiaryCard from "../BeneficiaryCard";

type PlansHeaderSectionProps = {
  name: string;
  beneficiaryOptions: BeneficiaryOption[];
};

export default function PlansHeaderSection({
  name,
  beneficiaryOptions,
}: PlansHeaderSectionProps) {
  return (
    <div className="plans-header-section">
      <div className="plans-header-section__header">
        <h3 className="plans-header-section__title">
          {name} ¿Para quién deseas cotizar?
        </h3>
        <p className="plans-header-section__subtitle">
          Selecciona la opción que se ajuste más a tus necesidades.
        </p>
      </div>
      <div className="plans-header-section__beneficiary-section">
        {beneficiaryOptions.map((option, index) => (
          <BeneficiaryCard
            key={index}
            id={option.id}
            icon={option.icon}
            title={option.title}
            text={option.text}
          />
        ))}
      </div>
    </div>
  );
}
