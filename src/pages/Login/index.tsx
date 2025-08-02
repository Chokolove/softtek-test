import BrandBar from "@/components/BrandBar";
import loginImage from "@/assets/login-side.png";
import "./login.scss";
import LoginForm from "@/components/LoginForm";
import Footer from "@/components/Footer";

export default function Login() {
  return (
    <div className="login-page">
      <BrandBar />
      <div className="login">
        <img src={loginImage} alt="People" className="login__image" />
        <div className="login__content">
          <div className="login__title-with-image">
            <div className="login__header">
              <p className="login__pill">Seguro Salud Flexible</p>
              <h2 className="login__title">Creado para ti y tu familia</h2>
            </div>
            <img
              className="login__inline-image"
              src={loginImage}
              alt="People"
            />
          </div>
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
