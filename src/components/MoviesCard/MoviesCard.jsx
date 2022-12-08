import "./MoviesCard.scss";
import save_disabled from "../../images/save_disabled.svg";
import save_active from "../../images/save_active.svg";
import close from "../../images/close.svg";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MoviesCard = ({movie, savedMovies, onCreateMovie, onDeleteMovie}) => {
  const url = useLocation();
  const currentUser = useSelector(state => state.user.user);
  const [isSaved, setIsSaved] = useState(false);
  const moviesCardSaved = isSaved ? save_active : save_disabled;
  const moviesCardClose = url.pathname==="/movies" ? moviesCardSaved : close;
  const poster = url.pathname ==="/movies" ? `https://api.nomoreparties.co${movie.image.url}` : movie.image; 
  const hour = (movie.duration / 60).toFixed(0);
  const minute = movie.duration % 60;

  useEffect(() => {
    if (url.pathname === "/movies") {
      const isOwner = savedMovies.some((item) => item.movieId === movie.id && item.owner._id === currentUser._id)
      setIsSaved(isOwner);
    }
  }, [])

  const handleClick = () => {
    if (url.pathname === "/saved-movies") {
      onDeleteMovie(movie);
    } else {
      const findMovie = savedMovies.find((item) => item.movieId === movie.id)
      isSaved ? onDeleteMovie(findMovie) : onCreateMovie(movie);
      setIsSaved(state => !state);
    }
  }

  return(
    <div className="moviesCard">
      <div className="moviesCard__flex">
        <div className="moviesCard__description">
          <h3 className="moviesCard__title">{movie.nameRU}</h3>
          <p className="moviesCard__duration">{hour}ч {minute < 10 ? "0" + minute : minute}м</p>
        </div>
        <button type="button" className="button moviesCard__button" onClick={handleClick}>
          <img className="moviesCard__save" src={moviesCardClose} alt="Иконка добавления в избранное или удаления" />
        </button>
      </div>
      <a className="link moviesCard__link" href={movie.trailerLink} target="_blank">
        <img className="moviesCard__poster" src={poster} alt="Постер фильма" />
      </a>
    </div>
  )
};

export default MoviesCard;