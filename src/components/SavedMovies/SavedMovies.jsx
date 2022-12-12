import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFilterMovies from "../../hooks/useFilterMovies";
import { setErrorMessage } from "../../services/slices/moviesSlice";
import { NOT_MOVIES_SEARCH_MESSAGE, NOT_SAVED_MOVIES_MESSAGE } from "../../utils/constants";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = () => {
  const [longMovie, setLongMovie] = useState([]);
  const [movie, setMovies] = useState([])
  const {handleSearch, handleCheckbox} = useFilterMovies();
  const dispatch = useDispatch();
  const { savedMovies, moviesPending } = useSelector(state => state.movies);
  
  useEffect(() => {
    setMovies(savedMovies);
    setLongMovie(savedMovies);
  }, [savedMovies])

  useEffect(() => {
    savedMovies.length === 0
    ? dispatch(setErrorMessage(NOT_SAVED_MOVIES_MESSAGE))
    : movie.length === 0 && !moviesPending
    ? dispatch(setErrorMessage(NOT_MOVIES_SEARCH_MESSAGE))
    : dispatch(setErrorMessage(''));
  }, [moviesPending, movie])


  const handleSearchMovies = (movieName, checked) => {
    const list = handleSearch(savedMovies, movieName);
    const shortList = handleCheckbox(list, checked);
    setMovies(shortList)
    setLongMovie(list);
  }

  const handleResetSearch = (checked) => {
    const shortList = handleCheckbox(savedMovies, checked);
    setMovies(shortList);
    setLongMovie(shortList);
  }

  const handleChangeCheckbox = (checked) => {
    const shortList = handleCheckbox(longMovie, checked);
    setMovies(shortList);
  }

  return(
    <>
      <SearchForm onSearch={handleSearchMovies} onResetForm={handleResetSearch} onChange={handleChangeCheckbox} />
      <MoviesCardList filterMovies={movie}/>
    </>
  )
};

export default memo(SavedMovies);