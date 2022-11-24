import './App.css';
import Main from '../Main/Main';
import { Switch, Route, withRouter } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import PopupWithError from '../PopupWithError/PopupWithError';
import useOpenPopup from '../../hooks/useOpenPopup';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useEffect, useState } from 'react';
import { createMovies, deleteMovie, getSavedMovies, getUser, login, register } from '../../utils/mainApi';
import { LoggedInContext } from '../../context/LoggedInContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { getMovies } from '../../utils/moviesApi';
import { NOT_MOVIES_SEARCH_MESSAGE, SERVER_ERROR_MESSAGE } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';

const App = ({history}) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMessageApi, setErrorMessageApi] = useState('');
  const [currentUser, setCurrentUser] = useState({_id: '', name: '', email: ''})
  const [filterMovies, setFilterMovies] = useState([]);
  const [isLoaderPage, setIsLoaderPage] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const [movieErrorMessage, setMovieErrorMessage] = useState('');
  const {handleOpenPopup, handleClosePopup, handleCLoseOverlayClick, isOpen, errorMessage} = useOpenPopup();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      handleGetUser(token)
    } else {
      setIsLoaderPage(false);
    }
  }, [])

  useEffect(() => {
    if(loggedIn) {
      handleGetSavedMovies();
      handleGetUser(localStorage.getItem('jwt'))
    } else {
      setSavedMovies([]);
    }
  }, [loggedIn])

  const handleRegister = async ({name, email, password}) => {
    try {
      setErrorMessageApi('');
      const res = await register({name, email, password});
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
      const user = await getUser(res.token);
      setCurrentUser({_id: user._id, name: user.name, email: user.email});
      setLoggedIn(true);
      history.push('/movies');
      handleGetSavedMovies();
    } catch (error) {
      setLoggedIn(false);
      setErrorMessageApi(error.message);
      console.log(error)
    }
  }

  const handleGetUser = async (token) => {
    try {
      const user = await getUser(token);
      if(user.name) {
        setLoggedIn(true);
        setCurrentUser({_id: user._id, name: user.name, email: user.email});
        handleGetSavedMovies();
        setIsLoaderPage(false);
      } else {
        localStorage.removeItem('jwt');
        sessionStorage.removeItem('moviesName');
      }
    } catch (error) {
      sessionStorage.removeItem('moviesName');
      setIsLoaderPage(false);
      console.log(error);
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    sessionStorage.removeItem('moviesName');
    setLoggedIn(false);
    setFilterMovies([]);
    setSavedMovies([]);
    setCurrentUser({_id: '', name: '', email: ''});
  }

  const handleSearchMovies = async (movieName) => {
    try {
      setMovieErrorMessage('')
      setIsLoader(true);
      const moviesApi = await getMovies();

      const list = moviesApi.filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                                          || movie.nameEN.toLowerCase().includes(movieName.toLowerCase()))
      list.length === 0 ? setMovieErrorMessage(NOT_MOVIES_SEARCH_MESSAGE) : setMovieErrorMessage('');
      setFilterMovies(list);

    } catch (err) {
      setMovieErrorMessage(SERVER_ERROR_MESSAGE);
    } finally {
      setIsLoader(false);
    }
  }

  const handleGetSavedMovies = async () => {
    const data = await getSavedMovies()
    setSavedMovies(data);
  }

  const handleCreateMovie = async (movie) => {
    const data = await createMovies(movie);
    handleGetSavedMovies();
  }

  const handleDeleteMovie = async (movie) => {
    const data = await deleteMovie(movie);
    setSavedMovies((movies) => {
      return movies.filter(item => item !== movie);
    })
  }

  return (isLoaderPage ? <Preloader /> :
    (<CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={loggedIn}>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            onSearch={handleSearchMovies}
            filterMovies={filterMovies}
            savedMovies={savedMovies}
            isLoader={isLoader}
            onError={handleOpenPopup}
            movieErrorMessage={movieErrorMessage}
            onCreateMovie={handleCreateMovie}
            onDeleteMovie={handleDeleteMovie}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            savedMovies={savedMovies}
            onDeleteMovie={handleDeleteMovie}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            onSignOut={handleSignOut}
          />
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
    </CurrentUserContext.Provider>)
    );
}

export default withRouter(App);
