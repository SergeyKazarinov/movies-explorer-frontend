import { useDispatch, useSelector } from "react-redux";
import { createSavedMoviesThunk, deleteSavedMoviesThunk } from "../../services/crateAsyncAction/movies";
import MovieDescription from "../UI/MovieDescription/MovieDescription";
import s from './MovieData.module.scss';


const MovieData = ({movie}) => {
  const {savedMovies} = useSelector(state => state.movies)
  const dispatch = useDispatch();

  const isOwner = savedMovies.find(item => item.movieId === movie.id);

  const background = {
    backgroundImage: `url(https://api.nomoreparties.co${movie.image.url})`,
    backgroundColor: "#000",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    filter: `blur(1.5rem) brightness(40%)`,
    zIndex: "-1",
    width: "100%",
    height: "100vh",
    position: "absolute",
    top: "0",
    left: "0",
    opacity: 0.4
  }

  const handleClick = () => {
    isOwner ? dispatch(deleteSavedMoviesThunk(isOwner)) : dispatch(createSavedMoviesThunk(movie));
  }

  return(
      <section className={s.movieData}>
        <div className={s.movieData__container}>
          <div className={s.movieData__flex}>
            <img className={s.movieData__image} src={`https://api.nomoreparties.co${movie.image.url}`} alt='Постер фильма'/>
            <a className={`link ${s.movieData__trailer}`} href={movie.trailerLink} target="_blank">Смотреть трейлер</a>
          </div>
          <div className={s.movieData__descriptionContainer}>
            <h2 className={s.movieData__title}>{movie.nameRU}</h2>
            <MovieDescription title="Название на английском" subtitle={movie.nameEN} />
            <MovieDescription title="Год производства" subtitle={movie.year} />
            <MovieDescription title="Страна" subtitle={movie.country} />
            <MovieDescription title="Режиссер" subtitle={movie.director} />
            <MovieDescription title="Продолжительность" subtitle={`${movie.duration} мин.`} />
          </div>
        </div>
        <p className={s.movieData__description}>{movie.description}</p>
        <button type="button" className={`button ${s.movieData__button}`} onClick={handleClick}>{isOwner ? "Удалить из сохраненных" : "Сохранить"}</button>
        <div style={background} className={s.background}></div>
      </section>
  )
}

export default MovieData;