import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

const Movies = ({onSearch, filterMovies, isLoader, onError, isShort, onChange}) => {
  return(
    <section className="movies">
      <SearchForm type="movies" onSearch={onSearch} onError={onError} isShort={isShort} onChange={onChange} isLoader={isLoader}/>
      <MoviesCardList
        filterMovies={filterMovies}
        isLoader={isLoader}
      />
    </section>
  )
};

export default Movies;