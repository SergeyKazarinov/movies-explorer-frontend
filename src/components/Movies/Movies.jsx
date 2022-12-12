import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesFromServer } from "../../services/crateAsyncAction/movies";
import { searchMovies } from "../../services/slices/searchMoviesSlice";
import { CHECKBOX, MOVIES_NAME } from "../../utils/constants";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

const Movies = ({onError}) => {
  const {moviesFromServer} = useSelector(state => state.movies);
  const { filterMovies, isShort } = useSelector(state => state.searchMovies)
  const dispatch = useDispatch();

  useEffect(() => {
    const moviesName = sessionStorage.getItem(MOVIES_NAME);
    const checkbox = sessionStorage.getItem(CHECKBOX)
    if (moviesName) {
      handleSearchMovies(moviesName, (checkbox === 'true' ? true : false));
    }
  }, [moviesFromServer]);

  const handleSearchMovies = (movieName, checked) => {
    moviesFromServer.length === 0 && dispatch(getMoviesFromServer());
    dispatch(searchMovies({movies: moviesFromServer, movieName, checked}))
  };

  const handleChangeChecked = (checked) => {
    handleSearchMovies(sessionStorage.getItem(MOVIES_NAME), checked);
    sessionStorage.setItem(CHECKBOX, checked)
  };

  return(
    <section className="movies">
      <SearchForm type="movies" onSearch={handleSearchMovies} onError={onError} isShort={isShort} onChange={handleChangeChecked}/>
      <MoviesCardList
        filterMovies={filterMovies}
      />
    </section>
  )
};

export default Movies;