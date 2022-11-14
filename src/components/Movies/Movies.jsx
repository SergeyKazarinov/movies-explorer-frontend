import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";

const Movies = () => {
  return(
    <section className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  )
};

export default Movies;