import { useForm } from "react-hook-form";
import "./loginForm.scss";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useLazyGetUserDataQuery } from "@/redux/services/userApi";

type FormValues = {
  docType: string;
  docNumber: string;
  phone: string;
  terms1: boolean;
  terms2: boolean;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();
  const [triggerGetUserData] = useLazyGetUserDataQuery(); // This needs to change if we use a mutation
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const user = await triggerGetUserData().unwrap();
      dispatch(
        login({
          docType: data.docType,
          docNumber: data.docNumber,
          phone: data.phone,
          name: user.name,
          lastName: user.lastName,
          birthDay: user.birthDay,
        })
      );
    } catch (err) {
      console.error("Error fetching user:", err);
    }
    navigate("/plans");
  };

  return (
    <div>
      <p className="login-form__text">
        Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
        asesoría. 100% online.
      </p>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="login-form__subgroup">
          <div className="login-form__field login-form__field--doc">
            <div className="login-form__doc-wrapper">
              <select
                className="login-form__select"
                {...register("docType", {
                  required: true,
                })}
              >
                <option value="dni">DNI</option>
                <option value="ce">CE</option>
                <option value="passport">Pasaporte</option>
              </select>

              <div className="login-form__input-wrapper login-form__input-wrapper--doc">
                <label
                  className="login-form__floating-label"
                  htmlFor="docNumber"
                >
                  Nro. de Documento
                </label>
                <input
                  id="docNumber"
                  className="login-form__input"
                  type="text"
                  placeholder=" "
                  {...register("docNumber", {
                    required: "Nro. de Documento requerido",
                  })}
                />
                {errors.docNumber && (
                  <span className="login-form__error">
                    {errors.docNumber.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="login-form__field">
            <div className="login-form__input-wrapper">
              <label htmlFor="phone" className="login-form__floating-label">
                Celular
              </label>
              <input
                id="phone"
                className="login-form__input"
                type="tel"
                placeholder=" "
                {...register("phone", {
                  required: "Numero de celular requerido",
                  pattern: {
                    value: /^[0-9]{9}$/,
                    message: "Debe tener 9 dígitos",
                  },
                })}
              />
              {errors.phone && (
                <span className="login-form__error">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="login-form__subgroup login-form__subgroup--small">
          <div className=" login-form__field--checkbox">
            <label className="login-form__checkbox-label">
              <input
                type="checkbox"
                className="login-form__checkbox"
                {...register("terms1", {
                  required: "Ambas politicas deben ser aceptadas",
                })}
              />
              <span className="login-form__custom-box" />
              Acepto lo Política de Privacidad
            </label>
            {errors.terms1 && (
              <span className="login-form__error">{errors.terms1.message}</span>
            )}
          </div>

          <div className=" login-form__field--checkbox">
            <label className="login-form__checkbox-label">
              <input
                type="checkbox"
                className="login-form__checkbox"
                {...register("terms2", {
                  required: "Ambas politicas deben ser aceptadas",
                })}
              />
              <span className="login-form__custom-box" />
              Acepto la Política Comunicaciones Comerciales
            </label>
            {errors.terms2 && (
              <span className="login-form__error">{errors.terms2.message}</span>
            )}
          </div>

          <a
            href="https://www.google.com/"
            target="_blank"
            className="login-form__link"
          >
            Aplican Términos y Condiciones.
          </a>
        </div>

        <button className="login-form__button" type="submit">
          Cotiza gratis
        </button>
      </form>
    </div>
  );
}
