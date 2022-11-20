import "./MoviesCard.css";
import save_disabled from "../../images/save_disabled.svg";
import save_active from "../../images/save_active.svg";
import close from "../../images/close.svg";
import movie from "../../images/movie_1.png";

const MoviesCard = ({type, nameRu, image, duration}) => {
  const isSaved = true;
  const moviesCardSaved = isSaved ? save_active : save_disabled;
  const moviesCardClose = type==="movies" ? moviesCardSaved : close;
  const hour = (duration / 60).toFixed(0);
  const minute = duration % 60;

  return(
    <div className="moviesCard">
      <div className="movieCard__flex">
        <div className="moviesCard__description">
          <h3 className="moviesCard__title">{nameRu}</h3>
          <p className="moviesCard__duration">{hour}ч {minute < 10 ? "0" + minute : minute}м</p>
        </div>
        <button type="button" className="button moviesCard__button">
          <img className="movieCard__save" src={moviesCardClose} alt="Иконка добавления в избранное или удаления" />
        </button>
      </div>
      <img className="movieCard__poster" src={`https://api.nomoreparties.co${image}`} alt="Постер фильма" />
    </div>
  )
};

export default MoviesCard;