import { createSlice } from "@reduxjs/toolkit";
import { MOVIES_SERVER_ERROR_MESSAGE } from "../../utils/constants";
import { getMoviesFromServer } from "../crateAsyncAction/movies";

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    moviesFromServer: [],
    moviesErrorMessage: '',
    moviesPending: false,
  },
  reducers: {
    clearMoviesFromServer(state) {
      state.moviesFromServer = [];
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
    }
  }
})

export default moviesSlice.reducer;
export const { clearMoviesFromServer } = moviesSlice.actions; 