import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = ({type}) => {
  return(
    <section className="movieCardList">
      <ul className="list movieCardList__grid">
        <li><MoviesCard type={type}/></li>
        <li><MoviesCard type={type}/></li>
        <li><MoviesCard type={type}/></li>
        <li><MoviesCard type={type}/></li>
        <li><MoviesCard type={type}/></li>
        <li><MoviesCard type={type}/></li>
        <li><MoviesCard type={type}/></li>
      </ul>
      {type==="movies" && <button type="button" className="button movieCardList__button">Ещё</button>}
    </section>
  )
};

export default MoviesCardList;