import { combineReducers, configureStore } from '@reduxjs/toolkit'
import moviesSlice from './slices/moviesSlice'
import userSlice from './slices/userSlice'

const rootReducer = combineReducers({
  user: userSlice,
  movies: moviesSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})