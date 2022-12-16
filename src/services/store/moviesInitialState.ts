import { IMovieInitialState } from "../../interface/IMovies";

export const moviesInitialState: IMovieInitialState = {
  moviesErrorMessage: '',
  moviesPending: false,

  moviesFromServer: [],
  savedMovies: [],
};