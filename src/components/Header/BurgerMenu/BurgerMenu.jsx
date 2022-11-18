import React from "react";
import "./BurgerMenu.css";
import line from "../../../images/line.svg"
import closeButton from "../../../images/close-button.svg"
import { NavLink } from "react-router-dom";
import useOpenBurger from "../../../hooks/useOpenBurger";

const BurgerMenu = ({loggedIn}) => {
const {handleMenuClick, isButtonMenu} = useOpenBurger(false);

  return(
    <section className="burgerMenu">
      <button 
        type="button" 
        className={`button burgerMenu__button ${loggedIn && "burgerMenu__button_type_loggedIn"}`} 
        onClick={handleMenuClick}
      >
        <img className="burgerMenu__line" src={line} alt="Линия"/>
        <img className="burgerMenu__line" src={line} alt="Линия"/>
        <img className="burgerMenu__line" src={line} alt="Линия"/>
      </button>
      
      <div className={`burgerMenu__container ${isButtonMenu && "burgerMenu__container_opened"}`}>
        <button type="button" className="button burgerMenu__button burgerMenu__button_type_close" onClick={handleMenuClick}>
          <img className="burgerMenu__close" src={closeButton} alt="Крестик"/>
        </button>
        <div className="burgerMenu__flex">
          <NavLink exact to="/" className="link burgerMenu__link" activeClassName="burgerMenu__link_active">Главная</NavLink>
          <NavLink to="/movies" className="link burgerMenu__link" activeClassName="burgerMenu__link_active">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="link burgerMenu__link" activeClassName="burgerMenu__link_active">Сохранённые фильмы</NavLink>
        </div>
        <NavLink to="/profile" className="link burgerMenu__link burgerMenu__link_type_profile">Аккаунт</NavLink>
      </div>
    </section>
  )
}

export default BurgerMenu;