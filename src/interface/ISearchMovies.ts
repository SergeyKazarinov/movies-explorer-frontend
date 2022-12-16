import {IMoviesFromServer, ISavedMovies} from './IMovies';

export type TFilterMovies = IMoviesFromServer[] & ISavedMovies[];

export interface ISearchMoviesInitialState {
  filterMovies: TFilterMovies;
  isShort: boolean;
  
  longSavedMovies: TFilterMovies;
  shortSavedMovies: TFilterMovies;
}