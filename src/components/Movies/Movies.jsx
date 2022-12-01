import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";

const Movies = ({onSearch, filterMovies, savedMovies, isLoader, onError, movieErrorMessage, onCreateMovie, onDeleteMovie, isShort, onChange}) => {
  return(
    <section className="movies">
      <SearchForm type="movies" onSearch={onSearch} onError={onError} isShort={isShort} onChange={onChange} isLoader={isLoader}/>
      <MoviesCardList
        savedMovies={savedMovies}
        filterMovies={filterMovies}
        isLoader={isLoader}
        movieErrorMessage={movieErrorMessage}
        onCreateMovie={onCreateMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </section>
  )
};

export default Movies;