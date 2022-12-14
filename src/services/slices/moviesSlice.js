import { createSlice } from "@reduxjs/toolkit";
import { MOVIES_SERVER_ERROR_MESSAGE } from "../../utils/constants";
import { createSavedMoviesThunk, deleteSavedMoviesThunk, getMoviesFromServer, getSavedMoviesThunk } from "../crateAsyncAction/movies";
import { moviesInitialState } from "../store/moviesInitialState";

const moviesSlice = createSlice({
  name: 'movies',
  initialState: moviesInitialState,
  reducers: {
    clearMovies(state) {
      state.moviesFromServer = [];
      state.savedMovies = [];
    },
    setErrorMessage(state, action) {
      state.moviesErrorMessage = action.payload;
    }
  },
  extraReducers: {
    [getMoviesFromServer.pending]: (state, action) => {
      state.moviesPending = true;
      state.moviesErrorMessage = '';
    },
    [getMoviesFromServer.fulfilled]: (state, action) => {
      state.moviesPending = false;
      state.moviesFromServer = action.payload;
    },
    [getMoviesFromServer.rejected]: (state, action) => {
      console.log(action.payload);
      state.moviesPending = false;
      state.moviesErrorMessage = MOVIES_SERVER_ERROR_MESSAGE;
    },


    [getSavedMoviesThunk.pending]: (state, action) => {
      state.savedMoviesErrorMessage = '';
    },
    [getSavedMoviesThunk.fulfilled]: (state, action) => {
      state.savedMovies = action.payload;
    },
    [getSavedMoviesThunk.rejected]: (state, action) => {
      state.savedMoviesErrorMessage = action.payload;
      console.log(action.payload);
    },


    [createSavedMoviesThunk.pending]: (state, action) => {
      state.savedMoviesErrorMessage = '';
    },
    [createSavedMoviesThunk.fulfilled]: (state, action) => {
      state.savedMovies = action.payload;
    },
    [createSavedMoviesThunk.rejected]: (state, action) => {
      state.savedMoviesErrorMessage = action.payload;
      console.log(action.payload);
    },


    [deleteSavedMoviesThunk.pending]: (state, action) => {
      state.savedMoviesErrorMessage = '';
    },
    [deleteSavedMoviesThunk.fulfilled]: (state, action) => {
      state.savedMovies = state.savedMovies.filter(item => item._id !== action.payload._id)
    },
    [deleteSavedMoviesThunk.rejected]: (state, action) => {
      state.savedMoviesErrorMessage = action.payload;
      console.log(action.payload);
    },
  }
})

export default moviesSlice.reducer;
export const { clearMovies, setErrorMessage } = moviesSlice.actions; 