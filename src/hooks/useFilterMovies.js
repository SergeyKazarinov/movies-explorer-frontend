import { MOVIE_SHORT_DURATION } from "../utils/constants";

const useFilterMovies = () => {
  const handleSearch = (movies, movieName) => {
    return movies.filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                                    || movie.nameEN.toLowerCase().includes(movieName.toLowerCase()))
  }

  const handleCheckbox = (movies, checked) => {
    if (!!checked) {
      return movies.filter(movie => movie.duration <= MOVIE_SHORT_DURATION);
    } else {
      return movies;
    }
  }
  return { handleSearch, handleCheckbox }
}

export default useFilterMovies;