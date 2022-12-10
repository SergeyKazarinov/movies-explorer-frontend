import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies } from "../../utils/moviesApi";


export const getMoviesFromServer = createAsyncThunk(
  'movies/getMovies',
  async (_, thunkApi) => {
    try {
      console.log('sdf')
      const movies = await getMovies();
      return movies;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)