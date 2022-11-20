import { useState } from "react";
import { NOT_MOVIES_SEARCH_MESSAGE, SERVER_ERROR_MESSAGE } from "../utils/constants";
import { getMovies } from "../utils/mainApi";

const useGetMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [movieErrorMessage, setMovieErrorMessage] = useState('');

  const handleSearchMovies = async (e, movieName) => {
    try {
      setMovies([])
      setMovieErrorMessage('')
      setIsLoader(true);
      e.preventDefault();
      const moviesApi = await getMovies();
      console.log(moviesApi);
      const list = moviesApi.filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                                          || movie.nameEN.toLowerCase().includes(movieName.toLowerCase()))
      list.length === 0 ? setMovieErrorMessage(NOT_MOVIES_SEARCH_MESSAGE) : setMovieErrorMessage('');
      setMovies(list);
    } catch (err) {
      setMovieErrorMessage(SERVER_ERROR_MESSAGE);
    } finally {
      setIsLoader(false);
    }
  }
  return {handleSearchMovies, movies, isLoader, movieErrorMessage};
}

export default useGetMovies;