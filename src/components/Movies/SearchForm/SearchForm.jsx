import "./SearchForm.css";
import search from "../../../images/search.svg";
import enter from "../../../images/enter.svg";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { useState } from "react";
import { useSearchMovies } from "../../../hooks/useSearchMovies";
import { useLocation } from "react-router-dom";

const SearchForm = ({type, onSearch, onError, isShort, onResetForm, onChange}) => {
  const [checked, setChecked] = useState(false);
  const {handleChange, handleSetItem, nameMovie} = useSearchMovies(type)
  const url = useLocation();

  const handleSearchMovies = (e)  => {
    e.preventDefault();
    if (url.pathname === '/movies') {
      handleSetItem(); 
      sessionStorage.setItem('checkbox', checked)
    };

    if (!!nameMovie) {
      onSearch(nameMovie, checked);
    } else {
      url.pathname === '/movies'
      ? onError("Нужно ввести ключевое слово", true)
      : onResetForm(checked);
    }
  }

  const handleChangeChecked = (checked) => {
    setChecked(checked);
    onChange(checked)
  }

  return(
    <div className="searchForm">
      <form className="searchForm__form" name="searchForm" onSubmit={handleSearchMovies} noValidate>
        <fieldset className="searchForm__set">
          <label htmlFor="search" className="searchForm__label">
            <img className="searchForm__img" src={search} alt="поиск" />
            <input 
              type="text"
              className="searchForm__input"
              placeholder="Фильм"
              id="search"
              name="movie"
              onChange={handleChange}
              value={nameMovie}
              required
            />
          </label>
        </fieldset>
        <button className="button button_type_search">
          <img className="button__image" src={enter} alt="Начать поиск" />
        </button>
        <div className="searchForm__flex">
          <div className="searchForm__line"></div>
        </div>
      </form>
      <FilterCheckbox onChangeChecked={handleChangeChecked} isShort={isShort}/>
    </div>
  )
}

export default SearchForm; 