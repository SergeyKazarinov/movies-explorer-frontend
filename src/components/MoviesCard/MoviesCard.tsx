import "./MoviesCard.scss";
import save_disabled from "../../images/save_disabled.svg";
import save_active from "../../images/save_active.svg";
import close from "../../images/close.svg";
import { useLocation } from "react-router";
import { FC, memo, useEffect, useState } from "react";
import { createSavedMoviesThunk, deleteSavedMoviesThunk } from "../../services/crateAsyncAction/movies";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { IMoviesFromServer, ISavedMovies } from "../../interface/IMovies";

interface IMoviesCard {
  movie: IMoviesFromServer & ISavedMovies;
}

const MoviesCard: FC<IMoviesCard> = ({movie}) => {
  const url = useLocation();
  const currentUser = useAppSelector(state => state.user.user);
  const { savedMovies } = useAppSelector(state => state.movies);
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useAppDispatch();
  const moviesCardSaved = isSaved ? save_active : save_disabled;
  const moviesCardClose = url.pathname==="/movies" ? moviesCardSaved : close;
  const poster = url.pathname ==="/movies" ? `https://api.nomoreparties.co${movie.image.url}` : movie.image;
  const link = url.pathname === "/movies" ? `/movies/${movie.id}` : `/movies/${movie.movieId}`;
  
  const hour = movie.duration <= 60 ? 0 : (movie.duration / 60).toFixed(0);
  const minute = movie.duration % 60;


  useEffect(() => {
    if (url.pathname === "/movies") {
      const isOwner = savedMovies.some((item) => item.movieId === movie.id && item.owner?._id === currentUser._id)
      setIsSaved(isOwner);
    }
  }, [])

  const handleClick = () => {
    if (url.pathname === "/saved-movies") {
      dispatch(deleteSavedMoviesThunk(movie));
    } else {
      const findMovie = savedMovies.find((item) => item.movieId === movie.id)
        findMovie
        ? dispatch(deleteSavedMoviesThunk(findMovie))
        : dispatch(createSavedMoviesThunk(movie));
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
      <Link to={link}>
        <img className="moviesCard__poster" src={poster} alt="Постер фильма" />
      </Link>
    </div>
  )
};

export default memo(MoviesCard);