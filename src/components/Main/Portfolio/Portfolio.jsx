import { memo } from "react";
import { initialProjects } from "../../../utils/projects";
import Project from "../Project/Project";
import "./Portfolio.scss";

const Portfolio = () => {

const project = initialProjects.map((item, index) => <li key={index}><Project title={`Проект "${item.name}"`} project={item} /></li>)

  return(
    <section className="portfolio" id="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="list portfolio__flex">
        {project}
      </ul>
    </section>
  )
}

export default memo(Portfolio);