import "./SearchForm.css";
import search from "../../../images/search.png";
import enter from "../../../images/enter.png";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return(
    <div className="searchForm">
      <form className="searchForm__form" name="searchForm">
        <fieldset className="searchForm__set">
          <label for="search" className="searchForm__label">
            <img className="searchForm__img" src={search} alt="поиск" />
            <input type="text" className="searchForm__input" placeholder="Фильм" id="search" />
          </label>
        </fieldset>
        <button className="button button_type_search">
          <img className="button__image" src={enter} alt="Начать поиск" />
        </button>
        <div className="searchForm__flex">
          <div className="searchForm__line"></div>
        </div>
      </form>
      <FilterCheckbox />
    </div>
  )
}

export default SearchForm; 