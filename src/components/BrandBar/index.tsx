import { Phone } from "lucide-react";
import "./brandBar.scss";

export default function BrandBar() {
  return (
    <div className="brand-bar">
      <img className="brand-bar__logo" src="/rimacLogo.png" alt="logo" />
      <div className="brand-bar__contact">
        <p className="brand-bar__text brand-bar__text--mobile-hidden">
          ¡Compra por este medio!
        </p>
        <p className="brand-bar__text brand-bar__text--phone">
          <Phone width={16} height={16} fill="#03050f" stroke="#03050f" />
          (01) 411 6001
        </p>
      </div>
    </div>
  );
}
