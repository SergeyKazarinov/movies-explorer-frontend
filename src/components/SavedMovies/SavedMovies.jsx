import { memo, useEffect, useState } from "react";
import useFilterMovies from "../../hooks/useFilterMovies";
import { NOT_MOVIES_SEARCH_MESSAGE } from "../../utils/constants";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({savedMovies, onDeleteMovie, isLoader}) => {
  const [longMovie, setLongMovie] = useState([]);
  const [movie, setMovies] = useState([])
  const [movieErrorMessage, setMovieErrorMessage] = useState('');
  const {handleSearch, handleCheckbox} = useFilterMovies();
  
  useEffect(() => {
    setMovies(savedMovies);
    setLongMovie(savedMovies);
  }, [savedMovies])

  useEffect(() => {
    if (savedMovies.length === 0) {
      setMovieErrorMessage('');
    } else {
      (movie.length === 0 && !isLoader) ? setMovieErrorMessage(NOT_MOVIES_SEARCH_MESSAGE) : setMovieErrorMessage('');
    }
  }, [isLoader, movie])


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
      <SearchForm onSearch={handleSearchMovies} onResetForm={handleResetSearch} onChange={handleChangeCheckbox} isLoader={isLoader}/>
      <MoviesCardList filterMovies={movie} onDeleteMovie={onDeleteMovie} movieErrorMessage={movieErrorMessage}/>
    </>
  )
};

export default memo(SavedMovies);