const useFilterMovies = () => {
  const handleSearch = (movies, movieName) => {
    return movies.filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                                    || movie.nameEN.toLowerCase().includes(movieName.toLowerCase()))
  }
  return {handleSearch}
}

export default useFilterMovies;