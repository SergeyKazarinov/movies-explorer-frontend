import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";

const Movies = () => {
  return(
    <section className="movies">
      <Header />
      <SearchForm />
      <Footer />
    </section>
  )
};

export default Movies;