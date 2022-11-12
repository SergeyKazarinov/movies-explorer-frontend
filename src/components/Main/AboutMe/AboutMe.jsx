import Title from "../../Title/Title";
import "./AboutMe.css";

const AboutMe = () => {
  return(
    <section className="aboutMe">
      <Title title = "Студент" />
      <ul className="list aboutMe__container">
        <li className="aboutMe__item">
          <div className="aboutMe__flex">
            <h3 className="aboutMe__name">Виталий</h3>
            <h4 className="aboutMe__about">Фронтенд-разработчик, 30 лет</h4>
            <p className="aboutMe__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ.
              У меня есть жена и дочь. 
              Я люблю слушать музыку, а ещё увлекаюсь бегом. 
              Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
              После того, как прошёл курс по веб&#8209;разработке, 
              начал заниматься фриланс&#8209;заказами и ушёл с постоянной работы.
            </p>
          </div>
          <a className="aboutMe__link" href="https://github.com/SergeyKazarinov" target="_blank">Github</a>
        </li>
        <li className="aboutMe__item">
          <div className="aboutMe__image"></div>
        </li>
      </ul>
    </section>
  )
}

export default AboutMe;