import { memo } from "react";
import Project from "../Project/Project";
import "./Portfolio.scss";

const Portfolio = () => {
  return(
    <section className="portfolio" id="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="list portfolio__flex">
        <li><Project title="Статичный сайт" link="https://github.com/SergeyKazarinov/how-to-learn" /></li>
        <li className="portfolio__line"></li>
        <li><Project title="Адаптивный сайт" link="https://github.com/SergeyKazarinov/russian-travel" /></li>
        <li className="portfolio__line"></li>
        <li><Project title="Одностраничное приложение" link="https://github.com/SergeyKazarinov/react-mesto-api-full" /></li>
      </ul>
    </section>
  )
}

export default memo(Portfolio);