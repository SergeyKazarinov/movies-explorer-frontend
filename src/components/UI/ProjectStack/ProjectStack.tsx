import { FC } from "react";
import { IStack } from "../../../interface/Props/IStack";
import s from "./ProjectStack.module.scss"

const ProjectStack: FC<IStack> = ({stack}) => {
  return(
    <div className={s.projectStack}>
      {stack}
    </div>
  )
}

export default ProjectStack;