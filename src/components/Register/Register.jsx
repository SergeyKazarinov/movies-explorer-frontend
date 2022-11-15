import {Link} from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.png";
import Fieldset from "../Fieldset/Fieldset";

const Register = () => {
  return(
    <section className="register">
      <img className="register__logo" src={logo} alt="Логотип" />
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form form">
        <Fieldset inputType = "text" inputClassType = "name" placeholder = "Имя" />
        <Fieldset inputType = "email" inputClassType = "email" placeholder = "E-mail" />
        <Fieldset inputType = "password" inputClassType = "password" placeholder = "Пароль" />
        <button className="button form__button">Зарегистрироваться</button> 
      </form>
      <p className="register__question">Уже зарегистрированы? <Link to="/signin" className="link register__link">Войти</Link></p>
    </section>
  )
}

export default Register;