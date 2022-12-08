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
    setIsLoaderPage(state, action) {
      state.isLoaderPage = action.payload;
    }
  },
  extraReducers: {
    [getUserFromApi.pending]: (state, action) => {
      state.isLoaderPage = true;
    },
    [getUserFromApi.fulfilled]: (state, action) => {
      state.isLoaderPage = false;
      state.loggedIn = true;
      state.user._id = action.payload._id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
    [getUserFromApi.rejected]: (state, action) => {
      state.isLoaderPage = false;
      state.user._id = '';
      state.user.name = '';
      state.user.email = '';
      console.log(action.payload);
    },


    [registerUser.pending]: (state, action) => {
      console.log('register')
      state.pending = true;
      state.errorMessageApi = '';
    },
    [registerUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.loggedIn = true;
      state.user._id = action.payload._id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      console.log(action.payload);
    },
    [registerUser.rejected]: (state, action) => {
      console.log(action.payload)
      state.pending = false;
      action.payload.statusCode === 400
      ? state.errorMessageApi = REGISTER_ERROR_MESSAGE
      : state.errorMessageApi = action.payload.message;
    },


    [loginUser.pending]: (state, action) => {
      console.log('login')
      state.pending = true;
      state.errorMessageApi = '';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.loggedIn = true;
      state.user._id = action.payload._id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
    [loginUser.rejected]: (state, action) => {
      state.pending = false;
      state.user._id = '';
      state.user.name = '';
      state.user.email = '';
      state.errorMessageApi = action.payload.message;
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
export const { setUser, clearUser, setIsLoaderPage } = userSlice.actions;