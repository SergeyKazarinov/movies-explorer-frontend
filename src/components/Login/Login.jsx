import {Link} from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";
import Fieldset from "../Fieldset/Fieldset";

const Login = () => {
  return(
    <main>
      <section className="login">
        <img className="login__logo" src={logo} alt="Логотип" />
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form form" noValidate>
          <Fieldset inputType = "email" inputClassType = "email" placeholder = "E-mail" />
          <Fieldset inputType = "password" inputClassType = "password" placeholder = "Пароль" />
          <button className="button form__button">Войти</button> 
        </form>
        <p className="login__question">Ещё не зарегистрированы? <Link to="/signup" className="link login__link">Регистрация</Link></p>
      </section>
    </main>
  )
}

export default Login;