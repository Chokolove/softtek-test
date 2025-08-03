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
        <div className="brand-bar__phone-container">
          <Phone width={16} height={16} fill="#03050f" stroke="#03050f" />
          <p className="brand-bar__phone-text" data-testid="brand-phone">
            (01) 411 6001
          </p>
        </div>
      </div>
    </div>
  );
}
