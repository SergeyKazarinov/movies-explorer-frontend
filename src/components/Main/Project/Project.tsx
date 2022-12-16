import { FC, useState } from "react";
import { IInitialProjects } from "../../../interface/IInitialProject";
import ProjectStack from "../../UI/ProjectStack/ProjectStack";
import s from "./Project.module.scss";

interface IProject {
  title: string;
  project: IInitialProjects;
}

const Project: FC<IProject> = ({title, project}) => {
  const [isOpenProject, setIsOpenProject] = useState(false);

  const handleClick = () => {
    setIsOpenProject(state => !state);
  }

  const stack = project.stack.map((item, index) => <li className={s.project__stack} key={index}><ProjectStack stack={item} /> </li>)

  return(
    <section className={`${s.project} ${isOpenProject && s.project_opened}`}>
      <button type="button" className={`button ${s.project__button}`} onClick={handleClick}>
        <h3 className={s.project__title}>{title}</h3>
        <div className={`${s.project__arrow} ${isOpenProject && s.project__arrow_active}`}>↗</div>
      </button>
      <div className={s.project__line}></div>
      <div className={`${s.project__about} ${isOpenProject && s.project__about_active}`}>
        <div className={s.project__flex}>
          <img className={s.project__image} src={project.scrin} alt="Гласная страница проекта место" />
          <div className={s.project__columns}>
            <h3 className={s.project__title}>О проекте</h3>
            <p className={s.project__info}>{project.description}</p>
            <h3 className={s.project__title}>Технологии и инструменты</h3>
            <ul className={`list ${s.project__list}`}>
              {stack}
            </ul>
          </div>
        </div>
        <div className={s.project__flexLink}>
          {project.link.length > 0 && <a className={`link ${s.project__link}`} href={project.link} target="_blank">Ссылка на сайт</a>}
          <a className={`link ${s.project__link}`} href={project.github} target="_blank">Ссылка на GitHub</a>
        </div>
      </div>
    </section>
  )
}

export default Project;