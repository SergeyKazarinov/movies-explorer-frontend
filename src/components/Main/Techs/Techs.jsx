import { memo } from "react";
import { STACKS } from "../../../utils/constants";
import Stack from "../../Stack/Stack";
import Title from "../../Title/Title";
import "./Techs.scss";

const Techs = () => {
  const stackElement = STACKS.map((item, index) => <li className="techs__item" key={index}><Stack stack={item} /></li>)

  return(
    <section className="techs" id="techs">
      <Title title = "Технические навыки" />
      <h3 className="techs__title">Hard-skills</h3>
      <p className="techs__description">
        Имею опыт в командной работе с использованием системы контроля версий Git.
        Владею навыками адаптивной и кроссбразуерной верстки, а также созданием многостраничных веб-приложений на React.js.
      </p>
      <div className="techs__flex-container">
        <ul className="list techs__flex">
          {stackElement}
        </ul>
      </div>
    </section>
  )
};

export default memo(Techs);