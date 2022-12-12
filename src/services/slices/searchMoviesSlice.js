import { createSlice } from "@reduxjs/toolkit";
import { MOVIE_SHORT_DURATION } from "../../utils/constants";

const filterMovies = (movies, movieName) => {
  return movies.filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                            || movie.nameEN.toLowerCase().includes(movieName.toLowerCase()));
}

const searchMoviesSlice = createSlice({
  name: 'searchMovies',
  initialState: {
    filterMovies: [],
    isShort: false,
  },
  reducers: {
    setFilterMovies(state, action) {
      console.log(action.payload)
      state.filterMovies = action.payload;
    },
    searchMovies(state, action) {
      state.isShort = action.payload.checked;
      const list = filterMovies(action.payload.moviesFromServer, action.payload.movieName)
      !!action.payload.checked
      ? state.filterMovies = list.filter(movie => movie.duration <= MOVIE_SHORT_DURATION)
      : state.filterMovies = list;
    }
  }
});

export default searchMoviesSlice.reducer;
export const { setFilterMovies, searchMovies } = searchMoviesSlice.actions;