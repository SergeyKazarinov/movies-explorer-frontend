import { useEffect, useState } from "react";
import useFilterMovies from "../../hooks/useFilterMovies";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

const SavedMovies = ({loggedIn, savedMovies, onDeleteMovie}) => {
  const [movie, setMovies] = useState([])
  const {handleSearch, handleCheckbox} = useFilterMovies();
  useEffect(() => {
    setMovies(savedMovies)
  }, [savedMovies])

  const handleSearchMovies = (movieName, checked) => {
    const list = handleSearch(savedMovies, movieName);
    const shortList = handleCheckbox(list, checked);
    setMovies(shortList)
  }

  const handleResetSearch = (checked) => {
    const shortList = handleCheckbox(savedMovies, checked);
    setMovies(shortList);
  }

  return(
    <>
      <Header loggedIn={loggedIn}/>
      <main>
        <SearchForm onSearch={handleSearchMovies} onResetForm={handleResetSearch} />
        <MoviesCardList filterMovies={movie} onDeleteMovie={onDeleteMovie} />
      </main>
      <Footer />
    </>
  )
};

export default SavedMovies;