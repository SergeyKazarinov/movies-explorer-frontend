import "./SearchForm.css";
import search from "../../../images/search.svg";
import enter from "../../../images/enter.svg";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { useEffect, useState } from "react";
import { useSearchMovies } from "../../../hooks/useSearchMovies";

const SearchForm = ({type, onSearch, onError}) => {
  const {handleChange, handleSearch, nameMovie} = useSearchMovies(type)

  const handleSearchMovies = (e)  => {
    handleSearch(e);
    if (!!nameMovie) {
      onSearch(e, nameMovie);
    } else {
      onError("Нужно ввести ключевое слово")
    }

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
      <FilterCheckbox />
    </div>
  )
}

export default SearchForm; 