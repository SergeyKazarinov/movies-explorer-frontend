import "./Footer.css";

const Footer = () => {
  const date = new Date().getFullYear();
  return(
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__line"></div>
      <div className="footer__flex">
        <p className="footer__copyright">&#169; {date}</p>
        <div className="footer__yandex">
          <p className="footer__text">Яндекс.Практикум</p>
          <a className="link footer__link" href="https://github.com/yandex-praktikum" target="_blank">Github</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;