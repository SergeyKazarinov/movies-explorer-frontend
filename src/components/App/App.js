import { useLocation, withRouter } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// components
import Preloader from '../Preloader/Preloader';
import MainPage from '../MainPage/MainPage';
// contexts and utils
import { createMovies, deleteMovie, getSavedMovies, getUser, login, register, updateUser } from '../../utils/mainApi';
import { NOT_MOVIES_SEARCH_MESSAGE, REGISTER_ERROR_MESSAGE, MOVIES_SERVER_ERROR_MESSAGE, USER_UPDATE_ERROR_MESSAGE, USER_UPDATE_MESSAGE, JWT, MOVIES_NAME, CHECKBOX, URLS_FOR_AUTHORIZATION } from '../../utils/constants';
import { getMovies } from '../../utils/moviesApi';
// hooks
import useOpenPopup from '../../hooks/useOpenPopup';
import useFilterMovies from '../../hooks/useFilterMovies';
import { clearUser, setIsLoaderPage, setUser } from '../../services/slices/userSlice';
import { getUserFromApi, registerUser } from '../../services/crateAsyncAction/user';

const App = ({history}) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorMessageApi, setErrorMessageApi] = useState('');
  const [moviesFromServer, setMoviesFromServer] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isButtonInactive, setIsButtonInactive] = useState(false);
  const [isShort, setIsShort] = useState(false)
  const [movieErrorMessage, setMovieErrorMessage] = useState('');
  const {handleOpenPopup, handleClosePopup, handleCLoseOverlayClick, isOpen, infoMessage, isError} = useOpenPopup();
  const {handleSearch, handleCheckbox} = useFilterMovies();
  const url = useLocation();

  const {loggedIn, isLoaderPage, pending} = useSelector(state => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(JWT);
    if (token) {
      handleGetMovies();
      dispatch(getUserFromApi(token));
    } else {
      handleSignOut();
      dispatch(setIsLoaderPage(false))
    }
  }, []);

  useEffect(() => {
    if (loggedIn && !pending && URLS_FOR_AUTHORIZATION.some((i) => i === url.pathname)) {
      history.push('/movies')
    } 
    // else if (!loggedIn && url.pathname === ['/movies', '/saved-movies', '/profile']) {

    // }

  }, [loggedIn, pending])

  useEffect(() => {
    const moviesName = sessionStorage.getItem(MOVIES_NAME);
    const checkbox = sessionStorage.getItem(CHECKBOX)
    if (moviesName) {
      setIsShort(checkbox === 'true' ? true : false);
      const list = handleSearch(moviesFromServer, moviesName);
      const shortList = handleCheckbox(list, isShort);
      setFilterMovies(shortList);
    }
  }, [moviesFromServer])

  useEffect(() => {
    if(loggedIn) {
      handleGetSavedMovies();
      dispatch(getUserFromApi(localStorage.getItem(JWT)))
    } else {
      setSavedMovies([]);
    }
  }, [loggedIn])

  // const handleRegister = ({name, email, password}) => {
  //   dispatch(registerUser({name, email, password}));
  //   }
  

  // const handleRegister = async ({name, email, password}) => {
  //   try {
  //     dispatch(registerUser({name, email, password}))
  //     setIsLoader(true);
  //     setIsButtonInactive(true);
  //     // const res = await register({name, email, password});
  //     // handleLogin({email, password})
      
  //   } catch (error) {
  //     if (error.statusCode === 400) {
  //       setErrorMessageApi(REGISTER_ERROR_MESSAGE)
  //     } else {
  //       setErrorMessageApi(error.message)
  //     }
  //     setIsButtonInactive(false);
  //   } finally {
  //     setIsLoader(false);
  //     setTimeout(() => {
  //       setErrorMessageApi('');
  //     }, 3000)
  //   }
  // }

  const handleLogin = async ({email, password}) => {
    try {
      setIsLoader(true);
      setIsButtonInactive(true);
      const res = await login({email, password});
      localStorage.setItem(JWT, res.token);
      const user = await getUser(res.token);
      dispatch(setUser(user));
      history.push('/movies');
      handleGetSavedMovies();
    } catch (error) {
      dispatch(clearUser());
      setErrorMessageApi(error.message);
      setIsButtonInactive(false);
      console.log(error);
    } finally {
      setIsLoader(false);
      setTimeout(() => {
        setErrorMessageApi('');
      }, 3000)
    }
  }

  const handleUpdateUser = async ({name, email}) => {
    try {
      setIsLoader(true);
      const user = await updateUser({name, email});
      dispatch(setUser(user));
      handleOpenPopup(USER_UPDATE_MESSAGE, false)
    } catch (error) {
      error.statusCode === 409 ? setErrorMessageApi(error.message) : setErrorMessageApi(USER_UPDATE_ERROR_MESSAGE);
    } finally {
      setIsLoader(false);
      setTimeout(() => {
        setErrorMessageApi('');
      }, 3000)
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem(JWT);
    sessionStorage.removeItem(MOVIES_NAME);
    sessionStorage.removeItem(CHECKBOX);
    setFilterMovies([]);
    setSavedMovies([]);
    setMoviesFromServer([]);
    setIsButtonInactive(false);

    dispatch(clearUser())
  };

  useEffect(() => {
    if (moviesFromServer.length === 0) {
      setMovieErrorMessage('');
    } else {
      (filterMovies.length === 0 && !isLoader) ? setMovieErrorMessage(NOT_MOVIES_SEARCH_MESSAGE) : setMovieErrorMessage('');
    }
  }, [isLoader, filterMovies])

  const handleGetMovies = async () => {
    try {
      setIsLoader(true);
      setMovieErrorMessage('')
      if (moviesFromServer.length === 0) {
        const moviesApi = await getMovies();
        setMoviesFromServer(moviesApi);
      }
    } catch (error) {
      setMovieErrorMessage(MOVIES_SERVER_ERROR_MESSAGE);
    } finally {
      setIsLoader(false);
    }
  };

  const handleSearchMovies = (movieName, checked) => {
    setIsShort(checked);
    setIsLoader(state => true);
    handleGetMovies();
    const list = handleSearch(moviesFromServer, movieName);
    const shortList = handleCheckbox(list, checked);
    setFilterMovies(shortList);
    setIsLoader(false);
  };

  const handleGetSavedMovies = async () => {
    try {
      const data = await getSavedMovies()
      setSavedMovies(data);
    } catch (error) {
      setMovieErrorMessage(MOVIES_SERVER_ERROR_MESSAGE);
      console.log(error)
    }
  }

  const handleCreateMovie = async (movie) => {
    try {
      const data = await createMovies(movie);
      handleGetSavedMovies();
    } catch(error) {
      setMovieErrorMessage(MOVIES_SERVER_ERROR_MESSAGE)
    }
  }

  const handleDeleteMovie = async (movie) => {
    try {
      const data = await deleteMovie(movie);
      setSavedMovies((movies) => {
        return movies.filter(item => item._id !== data._id);
      })
    } catch(err) {
      setMovieErrorMessage(MOVIES_SERVER_ERROR_MESSAGE)
    }
  }

  const handleChangeChecked = (checked) => {
    if (filterMovies.length > 0) {
    handleSearchMovies(sessionStorage.getItem(MOVIES_NAME), checked);
    sessionStorage.setItem(CHECKBOX, checked)
    }
  };

  return (isLoaderPage ? <Preloader /> :
        <MainPage
          onSearch={handleSearchMovies}
          filterMovies={filterMovies}
          savedMovies={savedMovies}
          isLoader={isLoader}
          onError={handleOpenPopup}
          movieErrorMessage={movieErrorMessage}
          onCreateMovie={handleCreateMovie}
          onDeleteMovie={handleDeleteMovie}
          isShort={isShort}
          onChange={handleChangeChecked}
          onSignOut={handleSignOut}
          onUpdateUser={handleUpdateUser}
          errorMessageApi={errorMessageApi}
          onSubmitLogin={handleLogin}
          isOpen={isOpen}
          onClose={handleClosePopup}
          infoMessage={infoMessage}
          onCLoseOverlay={handleCLoseOverlayClick}
          isError={isError}
          isButtonInactive={isButtonInactive}
        />
    );
}

export default withRouter(App);
