import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";

const Movies = () => {
  return(
    <>
      <Header loggedIn={true} />
      <main>
        <section className="movies">
          <SearchForm />
          <MoviesCardList type="movies"/>
        </section>
      </main>
      <Footer />
    </>
  )
};

export default Movies;