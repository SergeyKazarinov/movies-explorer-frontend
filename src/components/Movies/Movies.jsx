import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";

const Movies = ({onSearch, movies, isLoader, onError, isNotMovies}) => {
  return(
    <>
      <Header loggedIn={true} />
      <main>
        <section className="movies">
          <SearchForm type="movies" onSearch={onSearch} onError={onError}/>
          <MoviesCardList type="movies" movies={movies} isLoader={isLoader} isNotMovies={isNotMovies}/>
        </section>
      </main>
      <Footer />
    </>
  )
};

export default Movies;