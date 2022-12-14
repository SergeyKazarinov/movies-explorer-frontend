import "./PageNotFound.scss";
import {RouteComponentProps, withRouter} from "react-router-dom";

const PageNotFound = ({history}: RouteComponentProps): JSX.Element => {
  const handleClick = () => {
    history.goBack();
  }
  
  return(
    <section className="pageNotFound">
      <h2 className="pageNotFound__title">404</h2>
      <p className="pageNotFound__subtitle">Страница не найдена</p>
      <button className="button pageNotFound__link" onClick={handleClick}>Назад</button>
    </section>
  )
};

export default withRouter(PageNotFound);