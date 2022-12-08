import { createSlice } from "@reduxjs/toolkit";
import { REGISTER_ERROR_MESSAGE, USER_UPDATE_ERROR_MESSAGE } from "../../utils/constants";
import { getUserFromApi, onUpdateUser, loginUser, registerUser } from "../crateAsyncAction/user";


const userSlice = createSlice({
  name: 'user',
  initialState: {
    pending: false,
    loggedIn: false,
    isLoaderPage: true,
    openPopup: false,
    errorMessageApi: '',
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
      console.log(action.payload);
      state.isLoaderPage = false;
      state.user._id = '';
      state.user.name = '';
      state.user.email = '';
    },


    [registerUser.pending]: (state, action) => {
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
      console.log(action.payload);
      state.pending = false;
      state.user._id = '';
      state.user.name = '';
      state.user.email = '';
      state.errorMessageApi = action.payload.message;
    },

    [onUpdateUser.pending]: (state, action) => {
      state.openPopup = false;
      state.pending = true;
      state.errorMessageApi = '';
    },
    [onUpdateUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.openPopup = true;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
    [onUpdateUser.rejected]: (state, action) => {
      console.log(action.payload);
      state.pending = false;
      action.payload.statusCode === 409
      ? state.errorMessageApi = action.payload.message
      : state.errorMessageApi = USER_UPDATE_ERROR_MESSAGE;
    }
  }
})

export default userSlice.reducer;
export const { setUser, clearUser, setIsLoaderPage } = userSlice.actions;