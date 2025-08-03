import rimacLogoBlanco from "@/assets/rimacLogoBlanco.png";
import "./footer.scss";
export default function Footer() {
  return (
    <div className="footer">
      <img src={rimacLogoBlanco} alt="rimacLogo" className="footer__image" />
      <p className="footer__text">© 2023 RIMAC Seguros y Reaseguros.</p>
    </div>
  );
}
