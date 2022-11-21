import './App.css';
import Main from '../Main/Main';
import { Switch, Route } from 'react-router-dom';
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
import { register } from '../../utils/mainApi';

const App = () => {
  const [currentUser, setCurrentUser] = useState({name: 'Максим', email: '123@mail.ru'})
  const [isErrorApi, setIsErrorApi] = useState(false);
  const [errorMessageApi, setErrorMessageApi] = useState('');
  const {handleSearchMovies, filterMovies, isLoader, movieErrorMessage} = useGetMovies();
  const {handleOpenPopup, handleClosePopup, handleCLoseOverlayClick, isOpen, errorMessage} = useOpenPopup();

  const handleRegister = async ({name, email, password}) => {
    try {
      setIsErrorApi(false);
      setErrorMessageApi('');
      const res = await register({name, email, password});
      setCurrentUser({ name, email })
      console.log(res);
    } catch (error) {
      setIsErrorApi(true);
      error.statusCode === 409 ? setErrorMessageApi(error.message) : setErrorMessageApi('При регистрации пользователя произошла ошибка.')
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
          <Register onSubmit={handleRegister} errorMessageApi={errorMessageApi} isErrorApi={isErrorApi}/>
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>

      <PopupWithError isOpen={isOpen} onClose={handleClosePopup} errorMessage={errorMessage} onCLoseOverlay={handleCLoseOverlayClick}/>
    </CurrentUserContext.Provider>
  );
}

export default App;
