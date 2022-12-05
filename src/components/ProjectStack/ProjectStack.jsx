import s from "./ProjectStack.module.scss"

const ProjectStack = ({stack}) => {
  return(
    <div className={s.projectStack}>
      {stack}
    </div>
  )
}

export default ProjectStack;