import s from "./Movies.module.scss";
import { FC, useEffect } from "react";
import { getMoviesFromServer } from "../../services/crateAsyncAction/movies";
import { changeCheckbox, searchMovies, setFilterMovies } from "../../services/slices/searchMoviesSlice";
import { CHECKBOX, MOVIES_NAME } from "../../utils/constants";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { Button } from "../UI/Button/Button";
import SearchForm from "./SearchForm/SearchForm";
import { setErrorMessage } from "../../services/slices/moviesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";

const Movies: FC = () => {
  const {moviesFromServer, moviesPending} = useAppSelector(state => state.movies);
  const { filterMovies, isShort } = useAppSelector(state => state.searchMovies)
  const dispatch = useAppDispatch();

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

  const handleSearchMovies = (movieName: string, checked: boolean) => {
    moviesFromServer.length === 0 && dispatch(getMoviesFromServer());
    dispatch(searchMovies({movies: moviesFromServer, movieName, checked}))
  };

  const handleChangeChecked = (checked: boolean) => {
    dispatch(changeCheckbox({movies: moviesFromServer, checked}))
    sessionStorage.setItem(CHECKBOX, String(checked))
  };

  const handleDisplayAllMovies = () => {
    if (moviesFromServer.length === 0) {
      dispatch(getMoviesFromServer());
    } else {
      dispatch(setFilterMovies(moviesFromServer));
    }
  }

  const handleResetSearch = (checked: boolean) => {
    sessionStorage.setItem(MOVIES_NAME, '');
    handleSearchMovies('', checked);
  }

return(
  <section className={s.movies}>
    <SearchForm
      type="movies"
      onSearch={handleSearchMovies}
      onResetForm={handleResetSearch}
      isShort={isShort}
      onChange={handleChangeChecked}
    />
    <MoviesCardList filterMovies={filterMovies} />
    {!moviesPending && <Button buttonName="Отобразить все фильмы" onClick={handleDisplayAllMovies}/>}
  </section>
  )
};

export default Movies;