import Stack from "../../Stack/Stack";
import Title from "../../Title/Title";
import "./Techs.css";

const Techs = () => {
  return(
    <section className="techs">
      <Title title = "Технологии" />
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className="techs__flex-container">
        <ul className="list techs__flex">
          <li className="techs__item"><Stack stack="HTML" /></li>
          <li className="techs__item"><Stack stack="CSS" /></li>
          <li className="techs__item"><Stack stack="JS" /></li>
          <li className="techs__item"><Stack stack="React" /></li>
          <li className="techs__item"><Stack stack="Git" /></li>
          <li className="techs__item"><Stack stack="Express.js" /></li>
          <li className="techs__item"><Stack stack="mongoDB" /></li>
        </ul>
      </div>
    </section>
  )
};

export default Techs;