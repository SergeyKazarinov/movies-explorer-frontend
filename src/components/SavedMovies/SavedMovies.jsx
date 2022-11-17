import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

const SavedMovies = () => {
  return(
    <>
      <Header loggedIn={true}/>
      <main>
        <SearchForm />
        <MoviesCardList type="savedMovies"/>
      </main>
      <Footer />
    </>
  )
};

export default SavedMovies;