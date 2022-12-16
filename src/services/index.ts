import { combineReducers, configureStore } from '@reduxjs/toolkit'
import moviesSlice from './slices/moviesSlice'
import searchMoviesSlice from './slices/searchMoviesSlice'
import userSlice from './slices/userSlice'

const rootReducer = combineReducers({
  user: userSlice,
  movies: moviesSlice,
  searchMovies: searchMoviesSlice,
})

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;