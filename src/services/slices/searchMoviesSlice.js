import { createSlice } from "@reduxjs/toolkit";
import { MOVIE_SHORT_DURATION } from "../../utils/constants";

const filterMovies = (movies, movieName) => {
  return movies.filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                            || movie.nameEN.toLowerCase().includes(movieName.toLowerCase()));
}

const filterCheckbox = (movies, checked) => {
  return !!checked
  ? movies.filter(movie => movie.duration <= MOVIE_SHORT_DURATION)
  : movies;
}

const searchMoviesSlice = createSlice({
  name: 'searchMovies',
  initialState: {
    filterMovies: [],
    isShort: false,

    longSavedMovies: [],
    shortSavedMovies: [],
  },
  reducers: {
    setFilterMovies(state, action) {
      state.filterMovies = action.payload;
    },
    searchMovies(state, action) {
      state.isShort = action.payload.checked;
      const list = filterMovies(action.payload.movies, action.payload.movieName);
      state.filterMovies = filterCheckbox(list, action.payload.checked);
    },

    setSavedMovies(state, action) {
      console.log(action.payload)
      state.longSavedMovies = action.payload;
      state.shortSavedMovies = action.payload;
    },
    searchSavedMovies(state, action) {
      const list = filterMovies(action.payload.movies, action.payload.movieName);
      state.shortSavedMovies = filterCheckbox(list, action.payload.checked);
      state.longSavedMovies = list;
    },
    resetSearchSavedMovies(state, action) {
      state.shortSavedMovies = filterCheckbox(action.payload.movies, action.payload.checked);
      state.longSavedMovies = state.shortSavedMovies;
    },
    changeCheckbox(state, action) {
      state.shortSavedMovies = filterCheckbox(action.payload.movies, action.payload.checked);
    }
  }
});

export default searchMoviesSlice.reducer;
export const { setFilterMovies, searchMovies, searchSavedMovies, setSavedMovies, resetSearchSavedMovies, changeCheckbox } = searchMoviesSlice.actions;