import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfile, IUser } from "../../interface/IUser";
import { REGISTER_ERROR_MESSAGE, USER_UPDATE_ERROR_MESSAGE } from "../../utils/constants";
import { getUserFromApi, onUpdateUser, loginUser, registerUser } from "../crateAsyncAction/user";
import { userInitialState } from "../store/userInitialState";



const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.loggedIn = true;
      state.user = action.payload;
    },
    clearUser(state) {
      state.loggedIn = false;
      state.user._id = '';
      state.user.name = '';
      state.user.email = '';
    },
    setIsLoaderPage(state, action: PayloadAction<boolean>) {
      state.isLoaderPage = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUserFromApi.pending, (state, action) => {
        state.isLoaderPage = true;
      })
      .addCase(getUserFromApi.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoaderPage = false; 
        state.loggedIn = true;
        state.user = action.payload;
      })
      .addCase(getUserFromApi.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.isLoaderPage = false;
        state.user._id = '';
        state.user.name = '';
        state.user.email = '';
      })

      .addCase(registerUser.pending, (state, action) => {
        state.pending = true;
        state.errorMessageApi = '';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.pending = false; 
        state.loggedIn = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload)
        state.pending = false;
        action.payload.statusCode === 400
        ? state.errorMessageApi = REGISTER_ERROR_MESSAGE
        : state.errorMessageApi = action.payload.message;
      })

      .addCase(loginUser.pending, (state, action) => {
        state.pending = true;
        state.errorMessageApi = '';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.pending = false; 
        state.loggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.pending = false;
        state.user._id = '';
        state.user.name = '';
        state.user.email = '';
        state.errorMessageApi = action.payload.message;
      })

      .addCase(onUpdateUser.pending, (state, action) => {
        state.openPopup = false;
        state.pending = true;
        state.errorMessageApi = '';
      })
      .addCase(onUpdateUser.fulfilled, (state, action: PayloadAction<IProfile>) => {
        state.pending = false; 
        state.openPopup = true;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      })
      .addCase(onUpdateUser.rejected, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.pending = false;
        action.payload.statusCode === 409
        ? state.errorMessageApi = action.payload.message
        : state.errorMessageApi = USER_UPDATE_ERROR_MESSAGE;
      })
  }
})

export default userSlice.reducer;
export const { setUser, clearUser, setIsLoaderPage } = userSlice.actions;