import { memo } from "react";
import Title from "../../Title/Title";
import "./AboutMe.scss";
import phone from '../../../images/phone-icon.svg';
import github from '../../../images/github-icon.svg';
import gmail from '../../../images/gmail-icon.svg';
import telegram from '../../../images/telegram-icon.svg';
import linkedIn from '../../../images/linkedIn-icon.svg';
import Contact from "./Contact/Contact";

const AboutMe = () => {
  return(
    <section className="aboutMe" id="aboutMe">
      <Title title = "Обо мне" />
      <ul className="list aboutMe__container">
        <li className="aboutMe__item">
          <div className="aboutMe__flex">
            <h3 className="aboutMe__name">Сергей</h3>
            <h4 className="aboutMe__about">Frontend-developer, 30 лет</h4>
            <div className="aboutMe__description">
              <p className="aboutMe__descriptionItem">
                Я родился и живу в г. Пермь, в 2014 году закончил Пермский государственный национальный исследовательский университет.
                Также закончил Яндекс-курсы по направлению веб&#8209;разработчик и сейчас являюсь старшим студентом для вновь обучающихся.
              </p>
              <p className="aboutMe__descriptionItem">
                В свободное время занимаюсь созданием танцевальной электронной музыки с последующей публикацией на всех цифровых площадках, 
                в связи с чем, возникает потребность общаться на английском языке.
              </p>
              <p className="aboutMe__descriptionItem">
                Также занимаюсь различными видами спорта (фитнес, бег, горные лыжи и сноуборд, плавание).
              </p>
            </div>
          </div>
          <div className="aboutMe__contacts">
            <Contact href="https://github.com/SergeyKazarinov" src={github} alt="Логотип гитхаб" text="GitHub" />
            <Contact href="https://t.me/SKey92" src={telegram} alt="Логотип телеграмма" text="@Skey92" />
            <Contact href="https://www.linkedin.com/in/sergey-kazarinov-b621ba250/" src={linkedIn} alt="Логотип линкед ин" text="LinkedIn" />
            <Contact href="tel:7-905-862-5530" src={phone} alt="Логотип телефона" text="+7&#8209;(905)&#8209;862&#8209;55&#8209;30" />
            <Contact href="mailto:kazarinov092@gmail.com" src={gmail} alt="Логотип почты" text="kazarinov092@gmail.com" />
          </div>
        </li>
        <li className="aboutMe__item">
          <div className="aboutMe__image"></div>
        </li>
      </ul>
    </section>
  )
}


export default memo(AboutMe);