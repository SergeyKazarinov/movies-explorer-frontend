import { FormEvent, useCallback, useEffect } from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import "./Register.scss";
import logo from "../../images/logo.svg";
import Fieldset from "../UI/Fieldset/Fieldset";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { EMAIL_PATTERN } from "../../utils/constants";
import { registerUser } from "../../services/crateAsyncAction/user";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";

const Register = ({history}: RouteComponentProps): JSX.Element => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const {loggedIn, pending, errorMessageApi} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    loggedIn && history.push('/');
  }, [])

  useEffect(() => {
    resetForm()
  }, [loggedIn, resetForm]);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(registerUser({
      name: values.name,
      email: values.email,
      password: values.password
    }))
  }, [values]);
  
  return(
    <section className="register">
      <Link to="/" className="link register__linkLogo">
        <img src={logo} className="register__logo" alt='логотип' />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form form" onSubmit={handleSubmit} noValidate>
        <Fieldset
          inputType="text"
          inputClassType="name"
          placeholder="Имя"
          name="name"
          minLength={4}
          maxLength={40}
          onChange={handleChange}
          errors={errors}
          isValid={isValid}
        />
        <Fieldset
          inputType="email"
          inputClassType="email"
          placeholder="E-mail"
          name="email"
          minLength={4}
          maxLength={40}
          pattern={EMAIL_PATTERN}
          onChange={handleChange}
          errors={errors}
          isValid={isValid}
        />
        <Fieldset
          inputType="password"
          inputClassType="password"
          placeholder="Пароль"
          name="password"
          minLength={8}
          maxLength={50}
          onChange={handleChange}
          errors={errors}
          isValid={isValid}
        />
        <span className={`register__errorMessage ${!!errorMessageApi && "register__errorMessage_active"}`}>{errorMessageApi}</span>
        <button className={`button form__button ${!isValid && "form__button_inactive"}`} disabled={pending || !isValid}>
          {pending ? "Регистрация..." : "Зарегистрироваться"}
        </button> 
      </form>
      <p className="register__question">Уже зарегистрированы? <Link to="/signin" className="link register__link">Войти</Link></p>
    </section>
  )
}

export default withRouter(Register);