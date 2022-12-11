import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies } from "../../utils/moviesApi";
import { createMovies, deleteMovie, getSavedMovies } from "../../utils/mainApi";


export const getMoviesFromServer = createAsyncThunk(
  'movies/getMovies',
  async (_, thunkApi) => {
    try {
      const movies = await getMovies();
      return movies;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)


export const getSavedMoviesThunk = createAsyncThunk(
  'savedMovies/getSavedMovies',
  async (_, thunkApi) => {
    try {
      const savedMovies = await getSavedMovies();
      return savedMovies;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)

export const createSavedMoviesThunk = createAsyncThunk(
  'savedMovies/createSavedMovies',
  async (movie, thunkApi) => {
    try {
      const res = await createMovies(movie);
      const movies = await getSavedMovies();
      return movies;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)

export const deleteSavedMoviesThunk = createAsyncThunk(
  'savedMovies/deleteSavedMovies',
  async (movie, thunkApi) => {
    try {
      const res = await deleteMovie(movie);
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)