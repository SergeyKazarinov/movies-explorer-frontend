import { RouteComponentProps, useLocation, withRouter } from 'react-router-dom';
import { useEffect } from 'react';
// components
import MainPage from '../MainPage/MainPage';
import LoaderPage from '../UI/LoaderPage/LoaderPage';
// contexts and utils
import { NOT_MOVIES_SEARCH_MESSAGE, USER_UPDATE_MESSAGE, JWT, MOVIES_NAME, CHECKBOX, URLS_FOR_AUTHORIZATION } from '../../utils/constants';
// hooks
import useOpenPopup from '../../hooks/useOpenPopup';
// redux
import { clearUser, setIsLoaderPage } from '../../services/slices/userSlice';
import { getMoviesFromServer, getSavedMoviesThunk } from '../../services/crateAsyncAction/movies';
import { clearMovies, setErrorMessage } from '../../services/slices/moviesSlice';
import { setFilterMovies } from '../../services/slices/searchMoviesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { getUserFromApi } from '../../services/crateAsyncAction/user';


const App = ({history}: RouteComponentProps): JSX.Element => {
  const {handleOpenPopup, handleClosePopup, handleCLoseOverlayClick, isOpen, infoMessage, isError} = useOpenPopup();
  const url = useLocation();

  const {loggedIn, isLoaderPage, openPopup, pending} = useAppSelector(state => state.user)
  const {moviesFromServer, moviesPending } = useAppSelector(state => state.movies);
  const { filterMovies } = useAppSelector(state => state.searchMovies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem(JWT);
    if (token) {
      moviesFromServer.length === 0 && dispatch(getMoviesFromServer());
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
    if(loggedIn) {
      dispatch(getSavedMoviesThunk());
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
    dispatch(setFilterMovies([]));
    dispatch(clearMovies());
    dispatch(clearUser());
  };

  useEffect(() => {
    moviesFromServer.length === 0
    ? dispatch(setErrorMessage(''))
    : filterMovies.length === 0 && !moviesPending
    ? dispatch(setErrorMessage(NOT_MOVIES_SEARCH_MESSAGE))
    : dispatch(setErrorMessage(''))
  }, [filterMovies])

  return (isLoaderPage 
        ? <LoaderPage /> 
        : <MainPage
            onSignOut={handleSignOut}
            isOpen={isOpen}
            onClose={handleClosePopup}
            infoMessage={infoMessage}
            onCloseOverlay={handleCLoseOverlayClick}
            isError={isError}
          />
    );
}

export default withRouter(App);
