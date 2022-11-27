import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import PopupWithInfo from "../PopupWithInfo/PopupWithInfo";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";

const MainPage = ({
    onSearch,
    filterMovies,
    savedMovies,
    isLoader,
    onError,
    movieErrorMessage,
    onCreateMovie,
    onDeleteMovie,
    isShort,
    onChange,
    onSignOut,
    onUpdateUser,
    errorMessageApi,
    onSubmitRegister,
    onSubmitLogin,
    isOpen,
    onClose,
    infoMessage,
    onCLoseOverlay,
    isError,
  }) => {
  return(
    <>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <ProtectedRoute
          path="/movies"
          component={Movies}
          onSearch={onSearch}
          filterMovies={filterMovies}
          savedMovies={savedMovies}
          isLoader={isLoader}
          onError={onError}
          movieErrorMessage={movieErrorMessage}
          onCreateMovie={onCreateMovie}
          onDeleteMovie={onDeleteMovie}
          isShort={isShort}
          onChange={onChange}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          savedMovies={savedMovies}
          onDeleteMovie={onDeleteMovie}
          isLoader={isLoader}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          isLoader={isLoader}
          onSignOut={onSignOut}
          onUpdateUser={onUpdateUser}
          errorMessageApi={errorMessageApi}
        />
        <Route path="/signup">
          <Register onSubmit={onSubmitRegister} errorMessageApi={errorMessageApi} isLoader={isLoader} />
        </Route>
        <Route path="/signin">
          <Login onSubmit={onSubmitLogin} errorMessageApi={errorMessageApi} isLoader={isLoader} />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>

      <PopupWithInfo isOpen={isOpen} onClose={onClose} infoMessage={infoMessage} onCLoseOverlay={onCLoseOverlay} isError={isError}/>
    </>
  )
};

export default MainPage;