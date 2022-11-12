import "./Project.css";

const Project = ({title, link}) => {
  return(
    <a href={link} className="project" target="_blank">
      <h3 className="project__title">{title}</h3>
      <div className="project__arrow">↗</div>
    </a>
  )
}

export default Project;