import { useLocation, withRouter } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// components
import MainPage from '../MainPage/MainPage';
import LoaderPage from '../UI/LoaderPage/LoaderPage';
// contexts and utils
import { NOT_MOVIES_SEARCH_MESSAGE, USER_UPDATE_MESSAGE, JWT, MOVIES_NAME, CHECKBOX, URLS_FOR_AUTHORIZATION } from '../../utils/constants';
// hooks
import useOpenPopup from '../../hooks/useOpenPopup';
import useFilterMovies from '../../hooks/useFilterMovies';
// redux
import { clearUser, setIsLoaderPage } from '../../services/slices/userSlice';
import { getUserFromApi } from '../../services/crateAsyncAction/user';
import { getMoviesFromServer, getSavedMoviesThunk } from '../../services/crateAsyncAction/movies';
import { clearMovies, setErrorMessage } from '../../services/slices/moviesSlice';


const App = ({history}) => {
  const [filterMovies, setFilterMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isShort, setIsShort] = useState(false)
  const {handleOpenPopup, handleClosePopup, handleCLoseOverlayClick, isOpen, infoMessage, isError} = useOpenPopup();
  const {handleSearch, handleCheckbox} = useFilterMovies();
  const url = useLocation();

  const {loggedIn, isLoaderPage, openPopup, pending} = useSelector(state => state.user)
  const {moviesFromServer} = useSelector(state => state.movies);
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
      dispatch(clearMovies());
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
    dispatch(clearMovies())
    dispatch(clearUser())
  };

  useEffect(() => {
    moviesFromServer.length === 0
    ? dispatch(setErrorMessage(''))
    : filterMovies.length === 0 && !isLoader
    ? dispatch(setErrorMessage(NOT_MOVIES_SEARCH_MESSAGE))
    : dispatch(setErrorMessage(''))
  }, [isLoader, filterMovies])

  const handleGetMovies = () => {
    moviesFromServer.length === 0 && dispatch(getMoviesFromServer());
  }

  const handleSearchMovies = (movieName, checked) => {
    setIsShort(checked);
    setIsLoader(state => true);
    handleGetMovies();
    const list = handleSearch(moviesFromServer, movieName);
    const shortList = handleCheckbox(list, checked);
    setFilterMovies(shortList);
    setIsLoader(false);
  };

  const handleGetSavedMovies = () => {
    dispatch(getSavedMoviesThunk());
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
          isLoader={isLoader}
          onError={handleOpenPopup}
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
