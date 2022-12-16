export interface IName {
  name: string | any,
}

export interface IProfile extends IName {
  email: string
}

export interface ILogin {
  email: string,
  password: string,
}

export interface IRegister extends IProfile {
  password: string
}

export interface IUser extends IProfile {
  _id: string
}


export interface IUserInitialState {
  pending: boolean,
  loggedIn: boolean,
  isLoaderPage: boolean,
  openPopup: boolean,
  errorMessageApi: string,
  user: IUser
}