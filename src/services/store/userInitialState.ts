import { IUserInitialState } from "../../interface/IUser";

export const userInitialState: IUserInitialState = {
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
};