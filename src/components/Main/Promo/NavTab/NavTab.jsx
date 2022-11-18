import "./NavTab.css";

const NavTab = () => {
  return(
    <section className="navTab">
      <a href="#aboutProject" className="link navTab__item">О проекте</a>
      <a href="#techs" className="link navTab__item">Технологии</a>
      <a href="#aboutMe" className="link navTab__item">Студент</a>
    </section>
  );
}

export default NavTab;