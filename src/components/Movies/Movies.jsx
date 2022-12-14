import s from "./Movies.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesFromServer } from "../../services/crateAsyncAction/movies";
import { searchMovies, setFilterMovies } from "../../services/slices/searchMoviesSlice";
import { CHECKBOX, MOVIES_NAME } from "../../utils/constants";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { Button } from "../UI/Button/Button";
import SearchForm from "./SearchForm/SearchForm";
import { setErrorMessage } from "../../services/slices/moviesSlice";

const Movies = ({onError}) => {
  const {moviesFromServer} = useSelector(state => state.movies);
  const { filterMovies, isShort } = useSelector(state => state.searchMovies)
  const dispatch = useDispatch();

  useEffect(() => {
    moviesFromServer.length !== 0 && dispatch(setFilterMovies(moviesFromServer));
    const moviesName = sessionStorage.getItem(MOVIES_NAME);
    const checkbox = sessionStorage.getItem(CHECKBOX)
    if (moviesName) {
      handleSearchMovies(moviesName, (checkbox === 'true' ? true : false));
    } else {
      dispatch(setErrorMessage(''));
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

  const handleDisplayAllMovies = () => {
    if (moviesFromServer.length === 0) {
      dispatch(getMoviesFromServer());
    } else {
      dispatch(setFilterMovies(moviesFromServer));
    }
  }

  const handleResetSearch = (checked) => {
    sessionStorage.setItem(MOVIES_NAME, '');
    handleSearchMovies('', checked);
  }

return(
  <section className={s.movies}>
    <SearchForm type="movies" onSearch={handleSearchMovies} onError={onError} onResetForm={handleResetSearch} isShort={isShort} onChange={handleChangeChecked}/>
    <MoviesCardList filterMovies={filterMovies} />
    <Button buttonName="Отобразить все фильмы" onClick={handleDisplayAllMovies}/>
  </section>
  )
};

export default Movies;