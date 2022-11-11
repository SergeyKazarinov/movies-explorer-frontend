import AboutProject from './AboutProject/AboutProject';
import './Main.css';
import Promo from './Promo/Promo';

const Main = () => {
  return(
    <main className="main__page">
      <Promo />
      <AboutProject />
    </main>
  );
}

export default Main;