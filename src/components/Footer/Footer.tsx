import { FC } from "react";
import { memo } from "react";
import "./Footer.scss";

const Footer: FC = () => {
  const date = new Date().getFullYear();
  return(
    <footer className="footer">
      <h3 className="footer__title">Проект "Портфолио" х BeatFilm.</h3>
      <div className="footer__line"></div>
      <div className="footer__flex">
        <p className="footer__copyright">&#169; {date}</p>
        <div className="footer__yandex">
          <p className="footer__text">Сергей Казаринов</p>
          <a className="link footer__link" href="https://github.com/SergeyKazarinov" target="_blank">Github</a>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer);