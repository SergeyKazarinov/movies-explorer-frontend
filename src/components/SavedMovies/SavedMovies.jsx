import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

const SavedMovies = ({loggedIn, savedMovies, onDeleteMovie}) => {
  return(
    <>
      <Header loggedIn={loggedIn}/>
      <main>
        <SearchForm />
        <MoviesCardList filterMovies={savedMovies} onDeleteMovie={onDeleteMovie}/>
      </main>
      <Footer />
    </>
  )
};

export default SavedMovies;