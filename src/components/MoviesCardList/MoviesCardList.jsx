import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

const MoviesCardList = ({type, movies, isLoader}) => {
  let movieElement;
  if (type === "movies") {
    movieElement = movies.map(movie => (
      <li key={movie.id}><MoviesCard 
        key={movie.id}
        type={type}
        nameRu={movie.nameRU}
        image={movie.image.url}
        duration={movie.duration}
        movie={movie}
      /></li>
      ))
  }


  return(
    <section className="movieCardList">
      <ul className="list movieCardList__grid">
        {movieElement}
      </ul>
      {isLoader && <Preloader />}
      {type==="movies" && <button type="button" className="button movieCardList__button">Ещё</button>}
    </section>
  )
};

export default MoviesCardList;