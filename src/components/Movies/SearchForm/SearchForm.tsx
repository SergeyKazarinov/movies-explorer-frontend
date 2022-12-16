import "./SearchForm.scss";
import search from "../../../images/search.svg";
import enter from "../../../images/enter.svg";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { FC, FormEvent, useState } from "react";
import { useSearchMovies } from "../../../hooks/useSearchMovies";
import { CHECKBOX } from "../../../utils/constants";
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { useLocation } from "react-router-dom";

interface ISearchForm {
  type?: string;
  onSearch: (movieName: string, checked: boolean) => void;
  isShort?: boolean;
  onResetForm: (checked: boolean) => void;
  onChange: (checked: boolean) => void;
}

const SearchForm: FC<ISearchForm> = ({type, onSearch, isShort, onResetForm, onChange}) => {
  const [checked, setChecked] = useState(false);
  const {handleChange, handleSetItem, nameMovie} = useSearchMovies(type)
  const url = useLocation();
  const { moviesPending } = useAppSelector(state => state.movies);

  const handleSearchMovies = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!nameMovie) {
      if (url.pathname === '/movies') {
        handleSetItem(); 
        sessionStorage.setItem(CHECKBOX, String(checked))
      };
      
      onSearch(nameMovie, checked);
    } else {
      onResetForm(checked);
    }
  }

  const handleChangeChecked = (checked: boolean) => {
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
        <button className="button button_type_search" disabled={moviesPending}>
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