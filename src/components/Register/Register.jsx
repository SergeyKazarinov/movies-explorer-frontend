import {Link} from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";
import Fieldset from "../Fieldset/Fieldset";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const Register = () => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  return(
    <main>
      <section className="register">
        <img className="register__logo" src={logo} alt="Логотип" />
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form form" noValidate>
          <Fieldset
            inputType="text"
            inputClassType="name"
            placeholder="Имя"
            name="name"
            minLength="4"
            maxLength="40"
            onChange={handleChange}
            errors={errors}
            isValid={isValid}
          />
          <Fieldset
            inputType="email"
            inputClassType="email"
            placeholder="E-mail"
            name="email"
            minLength="4"
            maxLength="40"
            onChange={handleChange}
            errors={errors}
            isValid={isValid}
          />
          <Fieldset
            inputType="password"
            inputClassType="password"
            placeholder="Пароль"
            name="password"
            minLength="8"
            maxLength="50"
            onChange={handleChange}
            errors={errors}
            isValid={isValid}
          />
          <button className={`button form__button ${!isValid && "form__button_inactive"}`} disabled={!isValid}>Зарегистрироваться</button> 
        </form>
        <p className="register__question">Уже зарегистрированы? <Link to="/signin" className="link register__link">Войти</Link></p>
      </section>
    </main>
  )
}

export default Register;