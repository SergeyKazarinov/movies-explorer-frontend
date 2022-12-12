import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage } from "../../services/slices/moviesSlice";
import { changeCheckbox, resetSearchSavedMovies, searchSavedMovies, setSavedMovies } from "../../services/slices/searchMoviesSlice";
import { NOT_MOVIES_SEARCH_MESSAGE, NOT_SAVED_MOVIES_MESSAGE } from "../../utils/constants";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = () => {
  const dispatch = useDispatch();
  const { savedMovies, moviesPending } = useSelector(state => state.movies);
  const { longSavedMovies, shortSavedMovies } = useSelector(state => state.searchMovies);
  
  useEffect(() => {
    dispatch(setSavedMovies(savedMovies))
  }, [savedMovies])

  useEffect(() => {
    savedMovies.length === 0
    ? dispatch(setErrorMessage(NOT_SAVED_MOVIES_MESSAGE))
    : shortSavedMovies.length === 0 && !moviesPending
    ? dispatch(setErrorMessage(NOT_MOVIES_SEARCH_MESSAGE))
    : dispatch(setErrorMessage(''));
  }, [moviesPending, shortSavedMovies])


  const handleSearchMovies = (movieName, checked) => {
    dispatch(searchSavedMovies({movies: savedMovies, movieName, checked}))
  }
  const handleResetSearch = (checked) => {
    dispatch(resetSearchSavedMovies({ movies: savedMovies, checked }))
  }

  const handleChangeCheckbox = (checked) => {
    dispatch(changeCheckbox({movies: longSavedMovies, checked}))
  }

  return(
    <>
      <SearchForm onSearch={handleSearchMovies} onResetForm={handleResetSearch} onChange={handleChangeCheckbox} />
      <MoviesCardList filterMovies={shortSavedMovies}/>
    </>
  )
};

export default memo(SavedMovies);