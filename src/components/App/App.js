import './App.css';
import Main from '../Main/Main';
import { Switch, Route, withRouter } from 'react-router-dom';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import PopupWithInfo from '../PopupWithInfo/PopupWithInfo';
import useOpenPopup from '../../hooks/useOpenPopup';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createMovies, deleteMovie, getSavedMovies, getUser, login, register, updateUser } from '../../utils/mainApi';
import { LoggedInContext } from '../../context/LoggedInContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { getMovies } from '../../utils/moviesApi';
import { NOT_MOVIES_SEARCH_MESSAGE, SERVER_ERROR_MESSAGE } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';
import useFilterMovies from '../../hooks/useFilterMovies';

const App = ({history}) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMessageApi, setErrorMessageApi] = useState('');
  const [currentUser, setCurrentUser] = useState({_id: '', name: '', email: ''});
  const [moviesFromServer, setMoviesFromServer] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [isLoaderPage, setIsLoaderPage] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const [isShort, setIsShort] = useState(false)
  const [movieErrorMessage, setMovieErrorMessage] = useState('');
  const {handleOpenPopup, handleClosePopup, handleCLoseOverlayClick, isOpen, infoMessage, isError} = useOpenPopup();
  const {handleSearch, handleCheckbox} = useFilterMovies();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      handleGetMovies();
      handleGetUser(token);
    } else {
      setIsLoaderPage(false);
    }
  }, [])

  useEffect(() => {
    const moviesName = sessionStorage.getItem('moviesName');
    const checkbox = sessionStorage.getItem('checkbox')
    if (moviesName) {
      setIsShort(checkbox === 'true' ? true : false);
      const list = handleSearch(moviesFromServer, moviesName);
      const shortList = handleCheckbox(list, isShort);
      setFilterMovies(shortList);
      shortList.length === 0 ? setMovieErrorMessage(NOT_MOVIES_SEARCH_MESSAGE) : setMovieErrorMessage('');
    }
  }, [moviesFromServer])

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
    } finally {
      setTimeout(() => {
        setErrorMessageApi('');
      }, 3000)
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

  const handleUpdateUser = async ({name, email}) => {
    try {
      setErrorMessageApi('');
      const user = await updateUser({name, email});
      setCurrentUser({_id: user._id, name: user.name, email: user.email});
      handleOpenPopup("Данные успешно обновлены", false)
    } catch (error) {
      error.statusCode === 409 ? setErrorMessageApi(error.message) : setErrorMessageApi("При обновлении профиля произошла ошибка.");
    } finally {
      setTimeout(() => {
        setErrorMessageApi('');
      }, 3000)
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

  const handleGetMovies = async () => {
    try {
      setMovieErrorMessage('')
      if (moviesFromServer.length === 0) {
        const moviesApi = await getMovies();
        setMoviesFromServer(moviesApi);
      }
    } catch (err) {
      setMovieErrorMessage(SERVER_ERROR_MESSAGE);
    } finally {
      setIsLoader(false);
    }
  }

  // const handleFilterMovies = (movies, movieName) => {
  //     const list = movies.filter(movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
  //                                         || movie.nameEN.toLowerCase().includes(movieName.toLowerCase()))

  //     return list;
  // }

  const handleSearchMovies = (movieName, checked) => {
    setIsShort(checked);
    setMovieErrorMessage('')
    setIsLoader(true);
    handleGetMovies();
    const list = handleSearch(moviesFromServer, movieName);
    const shortList = handleCheckbox(list, checked);
    shortList.length === 0 ? setMovieErrorMessage(NOT_MOVIES_SEARCH_MESSAGE) : setMovieErrorMessage('');
    setFilterMovies(shortList);
  }

  // const handleSearchSavedMovies = (movieName) => {
  //   const list = handleFilterMovies(savedMovies, movieName);
  //   setFilterSavedMovies(list);
  // }

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
            isShort={isShort}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            savedMovies={savedMovies}
            onDeleteMovie={handleDeleteMovie}
            filterSavedMovies={filterSavedMovies}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            onSignOut={handleSignOut}
            onUpdateUser={handleUpdateUser}
            errorMessageApi={errorMessageApi}
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

        <PopupWithInfo isOpen={isOpen} onClose={handleClosePopup} infoMessage={infoMessage} onCLoseOverlay={handleCLoseOverlayClick} isError={isError}/>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>)
    );
}

export default withRouter(App);
