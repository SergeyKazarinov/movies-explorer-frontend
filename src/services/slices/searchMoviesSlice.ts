import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMoviesFromServer, ISavedMovies } from "../../interface/IMovies";
import { TFilterMovies } from "../../interface/ISearchMovies";
import { MOVIE_SHORT_DURATION } from "../../utils/constants";
import { searchMoviesInitialState } from "../store/searchMoviesInitialState";

interface IChangeCheckbox {
  movies: TFilterMovies;
  checked: boolean;
}

interface IPayload extends IChangeCheckbox {
  movieName: string;
}

const filterMovies = (movies: TFilterMovies, movieName: string): TFilterMovies => {
  return movies.filter((movie: IMoviesFromServer | ISavedMovies) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                            || movie.nameEN.toLowerCase().includes(movieName.toLowerCase()));
}

const filterCheckbox = (movies: TFilterMovies, checked: boolean) => {
  return !!checked
  ? movies.filter((movie: IMoviesFromServer | ISavedMovies) => movie.duration <= MOVIE_SHORT_DURATION)
  : movies;
}

const searchMoviesSlice = createSlice({
  name: 'searchMovies',
  initialState: searchMoviesInitialState,
  reducers: {
    setFilterMovies(state, action: PayloadAction<IMoviesFromServer[]>) {
      state.filterMovies = action.payload;
    },
    searchMovies(state, action: PayloadAction<IPayload>) {
      state.isShort = action.payload.checked;
      const list = filterMovies(action.payload.movies, action.payload.movieName);
      state.filterMovies = filterCheckbox(list, action.payload.checked);
    },
    changeCheckbox(state, action: PayloadAction<IChangeCheckbox>) {
      state.filterMovies = filterCheckbox(action.payload.movies, action.payload.checked);
    },

    setSavedMovies(state, action: PayloadAction<ISavedMovies[]>) {
      state.longSavedMovies = action.payload;
      state.shortSavedMovies = action.payload;
    },
    searchSavedMovies(state, action: PayloadAction<IPayload>) {
      const list = filterMovies(action.payload.movies, action.payload.movieName);
      state.shortSavedMovies = filterCheckbox(list, action.payload.checked);
      state.longSavedMovies = list;
    },
    resetSearchSavedMovies(state, action: PayloadAction<IChangeCheckbox>) {
      state.shortSavedMovies = filterCheckbox(action.payload.movies, action.payload.checked);
      state.longSavedMovies = state.shortSavedMovies;
    },
    changeCheckboxSavedMovies(state, action: PayloadAction<IChangeCheckbox>) {
      state.shortSavedMovies = filterCheckbox(action.payload.movies, action.payload.checked);
    }
  }
});

export default searchMoviesSlice.reducer;
export const {
  setFilterMovies,
  searchMovies,
  searchSavedMovies,
  setSavedMovies,
  resetSearchSavedMovies,
  changeCheckbox,
  changeCheckboxSavedMovies
} = searchMoviesSlice.actions;