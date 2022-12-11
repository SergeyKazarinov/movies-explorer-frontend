import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { LARGE_COUNT, LARGE_WINDOW_SIZE, MIDDLE_COUNT, MIDDLE_WiNDOW_SIZE, MORE_BUTTON_LARGE, MORE_BUTTON_MIDDLE, SMALL_COUNT } from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../UI/Preloader/Preloader";
import "./MoviesCardList.scss";

const MoviesCardList = ({filterMovies, isLoader }) => {
  const [moviesDisplay, setMoviesDisplay] = useState([]);
  const [count, setCount] = useState(0);
  const [windowSize, setWindowsSite] = useState(window.screen.width);
  const [isError, setIsError] = useState(false);
  const url = useLocation();
  const { moviesErrorMessage, moviesPending } = useSelector(state => state.movies);

  useEffect(() => {
    if (!isLoader) {
      !filterMovies.length ? setIsError(true) : setIsError(false);
    } else {
      setIsError(false)
    }
  }, [filterMovies, isLoader])

  const handleChangeWindow = () => {
    setWindowsSite(window.screen.width)
  }

  useEffect(() => {
    window.addEventListener("resize", handleChangeWindow);
    return () => {
      window.removeEventListener("resize", handleChangeWindow);
    }
  }, [])
  
  useEffect(() => {
    if (windowSize > LARGE_WINDOW_SIZE) {
      setCount(LARGE_COUNT)
    }  else if (windowSize <= LARGE_WINDOW_SIZE && windowSize > MIDDLE_WiNDOW_SIZE) {
      setCount(MIDDLE_COUNT)
    } else if (windowSize <= MIDDLE_WiNDOW_SIZE) {
      setCount(SMALL_COUNT);
    }
  }, [windowSize])

  useEffect(() => {
    if (url.pathname === '/movies') {
      if (windowSize > LARGE_WINDOW_SIZE) {
        setMoviesDisplay(filterMovies.slice(0, count));
      }  else if (windowSize <= LARGE_WINDOW_SIZE && windowSize > MIDDLE_WiNDOW_SIZE) {
        setMoviesDisplay(filterMovies.slice(0, count));
      } else if (windowSize <= MIDDLE_WiNDOW_SIZE) {
        setMoviesDisplay(filterMovies.slice(0, count));
      }
    } else {
      setMoviesDisplay(filterMovies)
    }
  }, [filterMovies, count])

  const handleMovieDisplay = () => {
    if (windowSize > LARGE_WINDOW_SIZE) {
      setMoviesDisplay(filterMovies.slice(0, moviesDisplay.length + MORE_BUTTON_LARGE))
    }  else if (windowSize <= LARGE_WINDOW_SIZE && windowSize > MIDDLE_WiNDOW_SIZE) {
      setMoviesDisplay(filterMovies.slice(0, moviesDisplay.length + MORE_BUTTON_MIDDLE))
    } else if (windowSize <= MIDDLE_WiNDOW_SIZE) {
      setMoviesDisplay(filterMovies.slice(0, moviesDisplay.length + MORE_BUTTON_MIDDLE))
    }
  }

  let movieElement;
    movieElement = moviesDisplay.map(movie => (
      <li key={movie.id || movie._id}><MoviesCard 
        key={movie.id || movie._id}
        movie={movie}
      /></li>
      ))

  return(
    <section className="movieCardList">
      {(!isLoader && isError) && <h2 className="movieCardList__title">{moviesErrorMessage}</h2>}
      {isLoader || moviesPending
        ? <Preloader />
        : <ul className="list movieCardList__grid">
            {movieElement}
          </ul>}
      {(url.pathname==="/movies" && filterMovies.length > moviesDisplay.length) 
        && 
        <button 
          type="button" 
          className="button movieCardList__button" 
          onClick={handleMovieDisplay}
        >
          Ещё
        </button>}
    </section>
  )
};

export default memo(MoviesCardList);