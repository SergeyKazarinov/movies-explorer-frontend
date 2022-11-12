import AboutProject from './AboutProject/AboutProject';
import './Main.css';
import Promo from './Promo/Promo';
import Techs from './Techs/Techs';

const Main = () => {
  return(
    <main className="main__page">
      <Promo />
      <AboutProject />
      <Techs />
    </main>
  );
}

export default Main;