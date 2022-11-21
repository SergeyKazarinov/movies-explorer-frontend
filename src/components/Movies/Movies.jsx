import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";

const Movies = ({onSearch, filterMovies, isLoader, onError, movieErrorMessage}) => {
  return(
    <>
      <Header loggedIn={true} />
      <main>
        <section className="movies">
          <SearchForm type="movies" onSearch={onSearch} onError={onError}/>
          <MoviesCardList filterMovies={filterMovies} isLoader={isLoader} movieErrorMessage={movieErrorMessage}/>
        </section>
      </main>
      <Footer />
    </>
  )
};

export default Movies;