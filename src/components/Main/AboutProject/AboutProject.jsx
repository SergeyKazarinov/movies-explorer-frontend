import { memo } from "react";
import Title from "../../Title/Title";
import "./AboutProject.scss";

const AboutProject = () => {
  return(
    <section className="aboutProject" id="aboutProject">
      <Title title = "О проекте" />
      <div className="aboutProject__info">
        <p className="aboutProject__info-item">
          Сайт-портфолио представляет из себя главную страницу,
          в которой описана информация о прокете, обо мне, моих технических навыков и информцию о моих проектах,
          а также возможность регистрации и авторизации.
        </p>
        <p className="aboutProject__info-item">
          После регистрации появляется возможность к вкладкам "фильмы" и "сохраненные фильмы".
          Во вкладке "фильмы" осуществялется запрос на сервис "beatfilm&#8209;movies".
          Также имеется возможность добавления фильмов в разедел "сохраненные фильмы", которые сохраняются на backend.
        </p>
        <p className="aboutProject__info-item">
          Во вкладке "сохраненные фильмы" осуществляется запрос на собственный backend и отображаются фильмы, сохраненные пользователем.
        </p>
      </div>
      <ul className="list aboutProject__list">
        <li className="aboutProject__item">
          <h3 className="aboutProject__subtitle">Проект включал 5 этапов</h3>
          <p className="aboutProject__description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className="aboutProject__item">
          <h3 className="aboutProject__subtitle">На выполнение проекта ушло 5 недель</h3>
          <p className="aboutProject__description">
            Также функционал проекта продолжает доробатываться, осуществялется рефакторинг кода и добавление новой визуализации и функций.
          </p>
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

export default memo(AboutProject);