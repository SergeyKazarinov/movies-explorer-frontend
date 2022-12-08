import { createSlice } from "@reduxjs/toolkit";
import { REGISTER_ERROR_MESSAGE, USER_UPDATE_ERROR_MESSAGE } from "../../utils/constants";
import { getUserFromApi, handleUpdateUser, loginUser, registerUser } from "../crateAsyncAction/user";


const userSlice = createSlice({
  name: 'user',
  initialState: {
    pending: false,
    loggedIn: false,
    errorMessageApi: '',
    isLoaderPage: true,
    user: {
      _id: '',
      name: '',
      email: ''
    },

  },
  reducers: {
    setUser(state, action) {
      state.loggedIn = true;
      state.user._id = action.payload._id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
    clearUser(state) {
      state.loggedIn = false;
      state.user._id = '';
      state.user.name = '';
      state.user.email = '';
    },
  },
  extraReducers: {
    [getUserFromApi.pending]: (state, action) => {
      state.isLoaderPage = true;
    },
    [getUserFromApi.fulfilled]: (state, action) => {
      setUser(action.payload);
      state.isLoaderPage = false;
    },
    [getUserFromApi.rejected]: (state, action) => {
      clearUser();
      state.isLoaderPage = false;
      console.log(action);
    },

    [registerUser.pending]: (state, action) => {
      state.pending = true;
      state.errorMessageApi = '';
    },
    [registerUser.fulfilled]: (state, action) => {
      state.pending = false;
      console.log(action.payload);
    },
    [registerUser.rejected]: (state, action) => {
      state.pending = false;
      action.payload.statusCode === 400
      ? state.errorMessageApi = REGISTER_ERROR_MESSAGE
      : action.payload.statusCode = action.payload.message;
    },

    [loginUser.pending]: (state, action) => {
      state.pending = true;
      state.errorMessageApi = '';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.pending = false;
      setUser(action.payload);
    },
    [loginUser.rejected]: (state, action) => {
      state.pending = false;
      state.errorMessageApi = action.payload.message;
      clearUser();
    },

    [handleUpdateUser.pending]: (state, action) => {
      state.pending = true;
      state.errorMessageApi = '';
    },
    [handleUpdateUser.fulfilled]: (state, action) => {
      state.pending = false;
      setUser(action.payload);
    },
    [handleUpdateUser.rejected]: (state, action) => {
      state.pending = false;
      action.payload.statusCode === 409
      ? state.errorMessageApi = action.payload.message
      : state.errorMessageApi = USER_UPDATE_ERROR_MESSAGE;
    }
  }
})

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;