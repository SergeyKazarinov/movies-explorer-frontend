import "./AboutProject.css";

const AboutProject = () => {
  return(
    <section className="aboutProject">
      <h2 className="aboutProject__title">О проекте</h2>
      <div className="aboutProject__line"></div>
      <ul className="list aboutProject__list">
        <li className="aboutProject__item">
        <h3 className="aboutProject__subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="aboutProject__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="aboutProject__item">
          <h3 className="aboutProject__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="aboutProject__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="list aboutProject__scale">
        <li className="aboutProject__backend">
          <div className="aboutProject__scale-backend">1 неделя</div>
          <p className="aboutProject__scale-subtitle">Back-end</p>
        </li>
        <li className="aboutProject__frontend">
          <div className="aboutProject__scale-frontend">4 недели</div>
          <p className="aboutProject__scale-subtitle">Front-end</p>
        </li>
      </ul>
    </section>
  );
};

export default AboutProject;