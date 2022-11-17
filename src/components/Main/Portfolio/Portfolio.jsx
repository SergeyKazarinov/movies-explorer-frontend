import Project from "../Project/Project";
import "./Portfolio.css";

const Portfolio = () => {
  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__flex">
        <Project title="Статичный сайт" link="https://github.com/SergeyKazarinov/how-to-learn" />
        <div className="portfolio__line"></div>
        <Project title="Адаптивный сайт" link="https://github.com/SergeyKazarinov/russian-travel" />
        <div className="portfolio__line"></div>
        <Project title="Одностраничное приложение" link="https://github.com/SergeyKazarinov/react-mesto-api-full" />
      </div>
    </section>
  )
}

export default Portfolio;