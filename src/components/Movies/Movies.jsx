import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";

const Movies = ({loggedIn, onSearch, filterMovies, savedMovies, isLoader, onError, movieErrorMessage, onCreateMovie, onDeleteMovie}) => {
  useEffect(() => {
    onSearch(sessionStorage.getItem('moviesName'))
  }, [])

  return(
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <section className="movies">
          <SearchForm type="movies" onSearch={onSearch} onError={onError}/>
          <MoviesCardList
            savedMovies={savedMovies}
            filterMovies={filterMovies}
            isLoader={isLoader}
            movieErrorMessage={movieErrorMessage}
            onCreateMovie={onCreateMovie}
            onDeleteMovie={onDeleteMovie}
          />
        </section>
      </main>
      <Footer />
    </>
  )
};

export default Movies;