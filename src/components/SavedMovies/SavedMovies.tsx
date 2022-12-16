import { FC, memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { setErrorMessage } from "../../services/slices/moviesSlice";
import { changeCheckboxSavedMovies, resetSearchSavedMovies, searchSavedMovies, setSavedMovies } from "../../services/slices/searchMoviesSlice";
import { NOT_MOVIES_SEARCH_MESSAGE, NOT_SAVED_MOVIES_MESSAGE } from "../../utils/constants";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies: FC = () => {
  const dispatch = useAppDispatch();
  const { savedMovies, moviesPending } = useAppSelector(state => state.movies);
  const { longSavedMovies, shortSavedMovies } = useAppSelector(state => state.searchMovies);
  
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


  const handleSearchMovies = (movieName: string, checked: boolean) => {
    dispatch(searchSavedMovies({movies: savedMovies, movieName, checked}))
  }
  const handleResetSearch = (checked: boolean) => {
    dispatch(resetSearchSavedMovies({ movies: savedMovies, checked }))
  }

  const handleChangeCheckbox = (checked: boolean) => {
    dispatch(changeCheckboxSavedMovies({movies: longSavedMovies, checked}))
  }

  return(
    <>
      <SearchForm onSearch={handleSearchMovies} onResetForm={handleResetSearch} onChange={handleChangeCheckbox} />
      <MoviesCardList filterMovies={shortSavedMovies}/>
    </>
  )
};

export default memo(SavedMovies);