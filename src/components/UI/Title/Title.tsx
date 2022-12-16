import { FC } from "react";
import "./Title.scss";

interface ITitle {
  title: string
}

const Title: FC<ITitle> = ({title}) => {
  return(
    <>
      <h2 className="title">{title}</h2>
      <div className="title__line"></div>
    </>
  )
}

export default Title;
