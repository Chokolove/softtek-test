import BrandBar from "@/components/BrandBar";
import loginImage from "@/assets/login-side.png";
import "./login.scss";
import LoginForm from "@/components/LoginForm";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // dispatch({ type: "RESET_STORE" });
  }, [dispatch, location]);
  return (
    <div className="login-page">
      <div className="login-page__background-blur-purlple"></div>
      <div className="login-page__background-blur-aqua"></div>
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
          <div className="login__divider" />
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
