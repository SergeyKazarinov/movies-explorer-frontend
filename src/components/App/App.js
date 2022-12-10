import { useLocation, withRouter } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// components
import MainPage from '../MainPage/MainPage';
import LoaderPage from '../UI/LoaderPage/LoaderPage';
// contexts and utils
import { createMovies, deleteMovie, getSavedMovies } from '../../utils/mainApi';
import { NOT_MOVIES_SEARCH_MESSAGE, MOVIES_SERVER_ERROR_MESSAGE, USER_UPDATE_MESSAGE, JWT, MOVIES_NAME, CHECKBOX, URLS_FOR_AUTHORIZATION } from '../../utils/constants';
// hooks
import useOpenPopup from '../../hooks/useOpenPopup';
import useFilterMovies from '../../hooks/useFilterMovies';
// redux
import { clearUser, setIsLoaderPage } from '../../services/slices/userSlice';
import { getUserFromApi } from '../../services/crateAsyncAction/user';
import { getMoviesFromServer } from '../../services/crateAsyncAction/movies';
import { clearMoviesFromServer } from '../../services/slices/moviesSlice';


const App = ({history}) => {
  const [savedMovies, setSavedMovies] = useState([]);
  // const [moviesFromServer, setMoviesFromServer] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isShort, setIsShort] = useState(false)
  const [movieErrorMessage, setMovieErrorMessage] = useState('');
  const {handleOpenPopup, handleClosePopup, handleCLoseOverlayClick, isOpen, infoMessage, isError} = useOpenPopup();
  const {handleSearch, handleCheckbox} = useFilterMovies();
  const url = useLocation();

  const {loggedIn, isLoaderPage, openPopup, pending} = useSelector(state => state.user)
  const {moviesFromServer, moviesErrorMessage, moviesPending} = useSelector(state => state.movies);
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

  useEffect(() => {
    openPopup && handleOpenPopup(USER_UPDATE_MESSAGE, false)
  }, [openPopup])

  const handleSignOut = () => {
    localStorage.removeItem(JWT);
    sessionStorage.removeItem(MOVIES_NAME);
    sessionStorage.removeItem(CHECKBOX);
    setFilterMovies([]);
    setSavedMovies([]);
    dispatch(clearMoviesFromServer())
    dispatch(clearUser())
  };

  useEffect(() => {
    if (moviesFromServer.length === 0) {
      setMovieErrorMessage('');
    } else {
      (filterMovies.length === 0 && !isLoader) ? setMovieErrorMessage(NOT_MOVIES_SEARCH_MESSAGE) : setMovieErrorMessage('');
    }
  }, [isLoader, filterMovies])

  const handleGetMovies = () => {
    moviesFromServer.length === 0 && dispatch(getMoviesFromServer());
  }

  // const handleGetMovies = async () => {
  //   try {
  //     setIsLoader(true);
  //     setMovieErrorMessage('')
  //     if (moviesFromServer.length === 0) {
  //       const moviesApi = await getMovies();
  //       // setMoviesFromServer(moviesApi);
  //     }
  //   } catch (error) {
  //     setMovieErrorMessage(MOVIES_SERVER_ERROR_MESSAGE);
  //   } finally {
  //     setIsLoader(false);
  //   }
  // };

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

  return (isLoaderPage ? <LoaderPage /> :
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
          isOpen={isOpen}
          onClose={handleClosePopup}
          infoMessage={infoMessage}
          onCLoseOverlay={handleCLoseOverlayClick}
          isError={isError}
        />
    );
}

export default withRouter(App);
