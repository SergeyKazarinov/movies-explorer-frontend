import { memo, useEffect, useState } from "react";
import useFilterMovies from "../../hooks/useFilterMovies";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

const SavedMovies = ({savedMovies, onDeleteMovie, isLoader}) => {
  const [longMovie, setLongMovie] = useState([]);
  const [movie, setMovies] = useState([])
  const {handleSearch, handleCheckbox} = useFilterMovies();
  useEffect(() => {
    setMovies(savedMovies);
    setLongMovie(savedMovies);
  }, [savedMovies])

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
      <MoviesCardList filterMovies={movie} onDeleteMovie={onDeleteMovie} />
    </>
  )
};

export default memo(SavedMovies);