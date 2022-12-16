import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMoviesFromServer, ISavedMovies } from "../../interface/IMovies";
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
    setErrorMessage(state, action: PayloadAction<string>) {
      state.moviesErrorMessage = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getMoviesFromServer.pending, (state, action) => {
        state.moviesPending = true;
        state.moviesErrorMessage = '';
      })
      .addCase(getMoviesFromServer.fulfilled, (state, action: PayloadAction<IMoviesFromServer[]>) => {
        state.moviesPending = false;
        state.moviesFromServer = action.payload;
      })
      .addCase(getMoviesFromServer.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.moviesPending = false;
        state.moviesErrorMessage = MOVIES_SERVER_ERROR_MESSAGE;
      })

      .addCase(getSavedMoviesThunk.pending, (state, action) => {
        state.moviesErrorMessage = '';
      })
      .addCase(getSavedMoviesThunk.fulfilled, (state, action: PayloadAction<ISavedMovies[]>) => {
        state.savedMovies = action.payload;
      })
      .addCase(getSavedMoviesThunk.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.moviesErrorMessage = action.payload;
      })

      .addCase(createSavedMoviesThunk.pending, (state, action) => {
        state.moviesErrorMessage = '';
      })
      .addCase(createSavedMoviesThunk.fulfilled, (state, action: PayloadAction<ISavedMovies[]>) => {
        state.savedMovies = action.payload;
      })
      .addCase(createSavedMoviesThunk.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.moviesErrorMessage = action.payload;
      })

      .addCase(deleteSavedMoviesThunk.pending, (state, action) => {
        state.moviesErrorMessage = '';
      })
      .addCase(deleteSavedMoviesThunk.fulfilled, (state, action: PayloadAction<ISavedMovies>) => {
        state.savedMovies = state.savedMovies.filter(item => item._id !== action.payload._id)
      })
      .addCase(deleteSavedMoviesThunk.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.moviesErrorMessage = action.payload;
      });
  }
})

export default moviesSlice.reducer;
export const { clearMovies, setErrorMessage } = moviesSlice.actions; 