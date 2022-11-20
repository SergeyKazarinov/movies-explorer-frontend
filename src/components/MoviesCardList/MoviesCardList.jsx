import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

const MoviesCardList = ({movies, isLoader, movieErrorMessage}) => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [moviesDisplay, setMovieDisplay] = useState([]);
  const url = useLocation();

  useEffect(() => {
    if (url.pathname === "/movies") {
      if (window.screen.width > 790) {
        setMovieDisplay(movies.slice(0, 12));
        movies.length > 12 && setIsButtonActive(true);
      }  else if (window.screen.width <= 790 && window.screen.width > 450) {
        setMovieDisplay(movies.slice(0, 8));
        movies.length > 8 && setIsButtonActive(true);
      } else if (window.screen.width < 450) {
        setMovieDisplay(movies.slice(0, 5));
        movies.length > 5 && setIsButtonActive(true);
      }
    }
  }, [movies])


  window.addEventListener("resize", () => {
    //console.log(window.screen.width)
  });

  let movieElement;
  if (url.pathname==="/movies") {
    movieElement = moviesDisplay.map(movie => (
      <li key={movie.id}><MoviesCard 
        key={movie.id}
        nameRu={movie.nameRU}
        image={movie.image.url}
        duration={movie.duration}
        movie={movie}
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
      {(url.pathname==="/movies" && isButtonActive ) && <button type="button" className="button movieCardList__button">Ещё</button>}
    </section>
  )
};

export default MoviesCardList;