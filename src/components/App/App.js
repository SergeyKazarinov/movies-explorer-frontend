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

const App = () => {
const {handleSearchMovies, movies, isLoader, isNotMovies} = useGetMovies();
const {handleOpenPopup, handleClosePopup, handleCLoseOverlayClick, isOpen, errorMessage} = useOpenPopup();
console.log(isNotMovies)

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies onSearch={handleSearchMovies} movies={movies} isLoader={isLoader} onError={handleOpenPopup} isNotMovies={isNotMovies}/>
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>

      <PopupWithError isOpen={isOpen} onClose={handleClosePopup} errorMessage={errorMessage} onCLoseOverlay={handleCLoseOverlayClick}/>
    </>
  );
}

export default App;
