import { createAsyncThunk } from '@reduxjs/toolkit'
import { JWT } from '../../utils/constants';
import { getUser, login, register, updateUser } from '../../utils/mainApi'

export const getUserFromApi = createAsyncThunk(
  'user/getUser',
  async (token, thunkAPI) => {
    try {
      const user = await getUser(token);
      return user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/postUser',
  async ({name, email, password}, thunkAPI) => {
    try {
      const res = await register({name, email, password});
      const token = await login({email, password});
      localStorage.setItem(JWT, token.token);
      const user = await getUser(token.token);
      return user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/postUserLogin',
  async ({email, password}, thunkApi) => {
    try {
      const res = await login({email, password});
      localStorage.setItem(JWT, res.token);
      const user = await getUser(res.token);
      return user;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)

export const handleUpdateUser = createAsyncThunk(
  'user/postUserUpdate',
  async ({name, email}, thunkApi) => {
    try {
      const res = await updateUser({name, email});
      return res;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
)