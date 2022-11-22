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
import { LoggedInContext } from '../../context/LoggedInContext';

const App = ({history}) => {
  const [currentUser, setCurrentUser] = useState({name: '', email: ''})
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMessageApi, setErrorMessageApi] = useState('');
  const {handleSearchMovies, filterMovies, isLoader, movieErrorMessage} = useGetMovies();
  const {handleOpenPopup, handleClosePopup, handleCLoseOverlayClick, isOpen, errorMessage} = useOpenPopup();

  const handleRegister = async ({name, email, password}) => {
    try {
      setErrorMessageApi('');
      const res = await register({name, email, password});
      setCurrentUser({ name, email });
      handleLogin({email, password})
    } catch (error) {
      if (error.statusCode === 400) {
        setErrorMessageApi('При регистрации пользователя произошла ошибка.')
      } else if (error.statusCode === 409) {
        setErrorMessageApi(error.message)
      } else {
        setErrorMessageApi(error.message)
      }
    }
  }

  const handleLogin = async ({email, password}) => {
    try {
      setErrorMessageApi('');
      const res = await login({email, password});
      localStorage.setItem('jwt', res.token);
      setLoggedIn(true);
      history.push('/movies');
    } catch (error) {
      setLoggedIn(false);
      setErrorMessageApi(error.message);
      console.log(error)
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={loggedIn}>
        <Switch>
          <Route exact path="/">
            <Main/>
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
            <Login onSubmit={handleLogin} errorMessageApi={errorMessageApi}/>
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>

        <PopupWithError isOpen={isOpen} onClose={handleClosePopup} errorMessage={errorMessage} onCLoseOverlay={handleCLoseOverlayClick}/>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
