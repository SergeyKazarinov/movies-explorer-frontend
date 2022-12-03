import { memo } from "react";
import { STACKS } from "../../../utils/constants";
import Stack from "../../Stack/Stack";
import Title from "../../Title/Title";
import "./Techs.scss";

const Techs = () => {
  const stackElement = STACKS.map(item => <li className="techs__item"><Stack stack={item} /></li>)
  
  return(
    <section className="techs" id="techs">
      <Title title = "Технологии" />
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className="techs__flex-container">
        <ul className="list techs__flex">
          {stackElement}
        </ul>
      </div>
    </section>
  )
};

export default memo(Techs);