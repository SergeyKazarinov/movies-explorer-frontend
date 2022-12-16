import { IUser } from "./IUser";

interface IMovie {
  country: string,
  description: string,
  director: string,
  duration: number,
  nameEN: string,
  nameRU: string,
  trailerLink: string,
  year: string,
}

export interface IMoviesFromServer extends IMovie {
  created_at?: string,
  id?: number,
  image?: any,
  updated_at?: string,
}

export interface ISavedMovies extends IMovie {
  image?: string,
  movieId?: number,
  owner?: IUser,
  thumbnail?: string,
  _id?: string,
}

export interface IMovieInitialState {
  moviesErrorMessage: string,
  moviesPending: boolean,

  moviesFromServer: Array<IMoviesFromServer>,
  savedMovies: Array<ISavedMovies>,
}
