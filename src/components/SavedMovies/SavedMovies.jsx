import { useEffect, useState } from "react";
import useFilterMovies from "../../hooks/useFilterMovies";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

const SavedMovies = ({loggedIn, savedMovies, onDeleteMovie, filterSavedMovies}) => {
  const [movie, setMovies] = useState([])
  const {handleSearch} = useFilterMovies();
  useEffect(() => {
    setMovies(savedMovies)
  }, [savedMovies])

  const handleSearchMovies = (movieName) => {
    const list = handleSearch(savedMovies, movieName)
    setMovies(list)
  }

  const handleResetSearch = () => {
    setMovies(savedMovies);
  }

  return(
    <>
      <Header loggedIn={loggedIn}/>
      <main>
        <SearchForm onSearch={handleSearchMovies} onError={handleResetSearch}/>
        <MoviesCardList filterMovies={movie} onDeleteMovie={onDeleteMovie} filterSavedMovies={filterSavedMovies} />
      </main>
      <Footer />
    </>
  )
};

export default SavedMovies;