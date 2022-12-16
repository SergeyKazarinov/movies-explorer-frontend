import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies } from "../../utils/moviesApi";
import { createMovies, deleteMovie, getSavedMovies } from "../../utils/mainApi";
import { IMoviesFromServer, ISavedMovies } from "../../interface/IMovies";


export const getMoviesFromServer = createAsyncThunk(
  'movies/getMovies',
  async (_, thunkApi) => {
    try {
      const movies = await getMovies();
      return movies as IMoviesFromServer[];
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
      return savedMovies as ISavedMovies[];
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)

export const createSavedMoviesThunk = createAsyncThunk(
  'savedMovies/createSavedMovies',
  async (movie: IMoviesFromServer, thunkApi) => {
    try {
      const res = await createMovies(movie);
      const movies = await getSavedMovies();
      return movies as ISavedMovies[];
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)

export const deleteSavedMoviesThunk = createAsyncThunk(
  'savedMovies/deleteSavedMovies',
  async (movie: ISavedMovies, thunkApi) => {
    try {
      const res = await deleteMovie(movie);
      return res as ISavedMovies;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)