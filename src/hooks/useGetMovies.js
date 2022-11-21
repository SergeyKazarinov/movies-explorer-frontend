import { useState } from "react";
import { NOT_MOVIES_SEARCH_MESSAGE, SERVER_ERROR_MESSAGE } from "../utils/constants";
import { getMovies } from "../utils/mainApi";

const useGetMovies = () => {
  const [filterMovies, setFilterMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [movieErrorMessage, setMovieErrorMessage] = useState('');

  const handleSearchMovies = async (e, movieName) => {
    try {
      setMovieErrorMessage('')
      setIsLoader(true);
      e.preventDefault();
      const moviesApi = await getMovies();
      console.log(moviesApi);
      const list = moviesApi.filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                                          || movie.nameEN.toLowerCase().includes(movieName.toLowerCase()))
      list.length === 0 ? setMovieErrorMessage(NOT_MOVIES_SEARCH_MESSAGE) : setMovieErrorMessage('');
      setFilterMovies(list);
    } catch (err) {
      setMovieErrorMessage(SERVER_ERROR_MESSAGE);
    } finally {
      setIsLoader(false);
    }
  }
  return {handleSearchMovies, filterMovies, isLoader, movieErrorMessage};
}

export default useGetMovies;