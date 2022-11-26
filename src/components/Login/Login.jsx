import {Link, withRouter} from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";
import Fieldset from "../Fieldset/Fieldset";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useCallback, useContext, useEffect } from "react";
import { LoggedInContext } from "../../context/LoggedInContext";

const Login = ({history, onSubmit, errorMessageApi}) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const loggedIn = useContext(LoggedInContext);

  useEffect(() => {
    loggedIn && history.push('/');
  }, []);

  useEffect(() => {
    resetForm();
  }, [loggedIn, resetForm])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    onSubmit({
      email: values.email,
      password: values.password
    })
  }, [values]);

  return(
    <main>
      <section className="login">
        <img className="login__logo" src={logo} alt="Логотип" />
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form form" onSubmit={handleSubmit} noValidate>
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
          <span className={`login__errorMessage ${!!errorMessageApi && "login__errorMessage_active"}`}>{errorMessageApi}</span>
          <button className={`button form__button ${!isValid && "form__button_inactive"}`} disabled={!isValid}>Войти</button> 
        </form>
        <p className="login__question">Ещё не зарегистрированы? <Link to="/signup" className="link login__link">Регистрация</Link></p>
      </section>
    </main>
  )
}

export default withRouter(Login);