import { FC } from "react";
import "./NavTab.scss";

const NavTab: FC = () => {
  return(
    <nav className="navTab">
      <a href="#aboutProject" className="link navTab__item">О проекте</a>
      <a href="#techs" className="link navTab__item">Технические навыки</a>
      <a href="#aboutMe" className="link navTab__item">Обо мне</a>
      <a href="#portfolio" className="link navTab__item">Портфолио</a>
    </nav>
  );
}

export default NavTab;