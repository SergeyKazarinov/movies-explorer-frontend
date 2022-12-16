import { FC } from "react";
import { IStack } from "../../interface/Props/IStack";
import "./Stack.scss"

const Stack: FC<IStack> = ({stack}) => {
  return(
    <div className="stack">
      {stack}
    </div>
  )
}

export default Stack;