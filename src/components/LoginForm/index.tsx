import { useForm } from "react-hook-form";
import "./loginForm.scss";
import toast, { Toaster } from "react-hot-toast";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onError = (errors: any) => {
    Object.values(errors).forEach((err: any) => {
      if (err?.message) toast.error(err.message);
    });
  };
  return (
    <div>
      <Toaster
        position="top-center"
        containerStyle={{
          marginTop: "8rem",
        }}
      />
      <p className="login-form__text">
        Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
        asesoría. 100% online.
      </p>
      <form className="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="login-form__subgroup">
          <div className="login-form__field login-form__field--doc">
            <div className="login-form__doc-wrapper">
              <select
                className="login-form__select"
                {...register("docType", { required: true })}
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
                    required: "Ingresa tu número de documento",
                  })}
                />
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
                  required: "Ingresa tu número de celular",
                  pattern: {
                    value: /^[0-9]{9}$/,
                    message: "Debe tener 9 dígitos",
                  },
                })}
              />
            </div>
          </div>
        </div>
        <div className="login-form__subgroup login-form__subgroup--small">
          <div className=" login-form__field--checkbox">
            <label className="login-form__checkbox-label">
              <input
                type="checkbox"
                className="login-form__checkbox"
                {...register("terms1", { required: "Error box 1" })}
              />
              <span className="login-form__custom-box" />
              Acepto lo Política de Privacidad
            </label>
          </div>

          <div className=" login-form__field--checkbox">
            <label className="login-form__checkbox-label">
              <input
                type="checkbox"
                className="login-form__checkbox"
                {...register("terms2", { required: "Error box 2" })}
              />
              <span className="login-form__custom-box" />
              Acepto la Política Comunicaciones Comerciales
            </label>
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
