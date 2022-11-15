import "./MoviesCard.css";
import save_disabled from "../../images/save_disabled.png";
import save_active from "../../images/save_active.png";
import close from "../../images/close.png";
import movie from "../../images/movie_1.png";

const MoviesCard = ({type}) => {
  const isSaved = true;
  const moviesCardSaved = isSaved ? save_active : save_disabled;
  const moviesCardClose = type==="movies" ? moviesCardSaved : close;

  return(
    <div className="moviesCard">
      <div className="movieCard__flex">
        <div className="moviesCard__description">
          <h3 className="moviesCard__title">33 слова о дизайне</h3>
          <p className="moviesCard__duration">1ч 47м</p>
        </div>
        <img className="movieCard__save" src={moviesCardClose} alt="Иконка добавления в избранное или удаления" />
      </div>
      <img className="movieCard__poster" src={movie} alt="Постер фильма" />
    </div>
  )
};

export default MoviesCard;