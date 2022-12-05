import { useState } from "react";
import ProjectStack from "../../ProjectStack/ProjectStack";
import "./Project.scss";

const Project = ({title, project}) => {
  const [isOpenProject, setIsOpenProject] = useState(false);

  const handleClick = () => {
    setIsOpenProject(state => !state);
  }

  const stack = project.stack.map((item, index) => <li className="project__stack" key={index}><ProjectStack stack={item} /> </li>)

  return(
    <section className={`project ${isOpenProject && "project_opened"}`}>
      <button type="button" className="button project__button" onClick={handleClick}>
        <h3 className="project__title">{title}</h3>
        <div className={`project__arrow ${isOpenProject && "project__arrow_active"}`}>↗</div>
      </button>
      <div className="project__line"></div>
      <div className={`project__about ${isOpenProject && "project__about_active"}`}>
        <div className="project__flex">
          <img className="project__image" src={project.scrin} alt="Гласная страница проекта место" />
          <div className="project__columns">
            <h3 className="project__title">О проекте</h3>
            <p className="project__info">{project.description}</p>
            <h3 className="project__title">Технологии и инструменты</h3>
            <ul className="list project__list">
              {stack}
            </ul>
          </div>
        </div>
        <div className="project__flex-link">
          {project.link.length > 0 && <a className="link project__link" href={project.link} target="_blank">Ссылка на сайт</a>}
          <a className="link project__link" href={project.github} target="_blank">Ссылка на GitHub</a>
        </div>
      </div>
    </section>
  )
}

export default Project;