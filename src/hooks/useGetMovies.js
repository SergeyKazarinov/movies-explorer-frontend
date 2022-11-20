import { useState } from "react";
import { getMovies } from "../utils/mainApi";

const useGetMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const handleSearchMovies = async (e, movieName) => {
    try {
      setIsLoader(true);
      e.preventDefault();
      const moviesApi = await getMovies();
      console.log(moviesApi);
      const list = moviesApi.filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()) || movie.nameEN.toLowerCase().includes(movieName.toLowerCase()))
      setMovies(list)
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoader(false);
    }
  }
  return {handleSearchMovies, movies, isLoader};
}

export default useGetMovies;