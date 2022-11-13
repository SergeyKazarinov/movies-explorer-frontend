import "./Header.css";
import logo from "../../images/logo.png";

const Header = () => {
  return(
    <section className="header">
      <a className="link header__link_type_logo>" href="#">
        <img src={logo} className="header__logo" alt='логотип' />
      </a>
      <div className="header__navigation">
        <a className="link header__link" href="#">Регистрация</a>
        <a className="link header__link header__link_type_signin" href="#">Войти</a>
      </div>
    </section>
  )
}

export default Header;