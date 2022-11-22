import './App.css';
import Main from '../Main/Main';
import { Switch, Route, withRouter } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import useGetMovies from '../../hooks/useGetMovies';
import PopupWithError from '../PopupWithError/PopupWithError';
import useOpenPopup from '../../hooks/useOpenPopup';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useState } from 'react';
import { login, register } from '../../utils/mainApi';

const App = ({history}) => {
  const [currentUser, setCurrentUser] = useState({name: 'Максим', email: '123@mail.ru'})
  const [errorMessageApi, setErrorMessageApi] = useState('');
  const {handleSearchMovies, filterMovies, isLoader, movieErrorMessage} = useGetMovies();
  const {handleOpenPopup, handleClosePopup, handleCLoseOverlayClick, isOpen, errorMessage} = useOpenPopup();

  const handleRegister = async ({name, email, password}) => {
    try {
      setErrorMessageApi('');
      const res = await register({name, email, password});
      setCurrentUser({ name, email })

    } catch (error) {
      error.statusCode === 409 ? setErrorMessageApi(error.message) : setErrorMessageApi('При регистрации пользователя произошла ошибка.')
    }
  }

  const handleLogin = async ({email, password}) => {
    try {
      const res = await login({email, password});
      console.log(res.token);
      localStorage.setItem('jwt', res.token);
      history.push('/movies');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies
            onSearch={handleSearchMovies}
            filterMovies={filterMovies}
            isLoader={isLoader}
            onError={handleOpenPopup}
            movieErrorMessage={movieErrorMessage}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signup">
          <Register onSubmit={handleRegister} errorMessageApi={errorMessageApi}/>
        </Route>
        <Route path="/signin">
          <Login onSubmit={handleLogin}/>
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>

      <PopupWithError isOpen={isOpen} onClose={handleClosePopup} errorMessage={errorMessage} onCLoseOverlay={handleCLoseOverlayClick}/>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
