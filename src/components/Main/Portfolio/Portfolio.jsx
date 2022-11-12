import Project from "../Project/Project";
import "./Portfolio.css";

const Portfolio = () => {
  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__flex">
        <Project title="Статичный сайт" link="#" />
        <div className="portfolio__line"></div>
        <Project title="Адаптивный сайт" link="#" />
        <div className="portfolio__line"></div>
        <Project title="Одностраничное приложение" link="#" />
      </div>
    </section>
  )
}

export default Portfolio;