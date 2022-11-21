import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

const MoviesCardList = ({filterMovies, isLoader, movieErrorMessage}) => {
  const [moviesDisplay, setMoviesDisplay] = useState([]);
  const [count, setCount] = useState(0);
  const [windowSize, setWindowsSite] = useState(window.screen.width)
  const url = useLocation();

  const handleChangeWindow = () => {
    setWindowsSite(window.screen.width)
  }

  useEffect(() => {
    window.addEventListener("resize", handleChangeWindow);

    return () => {
      window.removeEventListener("resize", handleChangeWindow);
    }
  })
  
  useEffect(() => {
    if (url.pathname === "/movies") {
      if (windowSize > 790) {
        setCount(12)
      }  else if (windowSize <= 790 && windowSize > 450) {
        setCount(8)
      } else if (windowSize <= 450) {
        setCount(5);
      }
    };
  }, [windowSize])

  useEffect(() => {
    if (url.pathname === "/movies") {
      if (windowSize > 790) {
        setMoviesDisplay(filterMovies.slice(0, count));
      }  else if (windowSize <= 790 && windowSize > 450) {
        setMoviesDisplay(filterMovies.slice(0, count));
      } else if (windowSize <= 450) {
        setMoviesDisplay(filterMovies.slice(0, count));
      }
    }
  }, [filterMovies])

  const handleMovieDisplay = () => {
    if (windowSize > 790) {
      setMoviesDisplay(filterMovies.slice(0, moviesDisplay.length + 3))
    }  else if (windowSize <= 790 && windowSize > 450) {
      setMoviesDisplay(filterMovies.slice(0, moviesDisplay.length + 2))
    } else if (windowSize <= 450) {
      setMoviesDisplay(filterMovies.slice(0, moviesDisplay.length + 2))
    }
  }

  let movieElement;
  if (url.pathname==="/movies") {
    movieElement = moviesDisplay.map(movie => (
      <li key={movie.id}><MoviesCard 
        key={movie.id}
        nameRu={movie.nameRU}
        image={movie.image.url}
        duration={movie.duration}
        movie={movie}
        trailer={movie.trailerLink}
      /></li>
      ))
  }

  return(
    <section className="movieCardList">
      {movieErrorMessage && <h2 className="movieCardList__title">{movieErrorMessage} &#128532;</h2>}
      <ul className="list movieCardList__grid">
        {movieElement}
      </ul>
      {isLoader && <Preloader />}
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

export default MoviesCardList;