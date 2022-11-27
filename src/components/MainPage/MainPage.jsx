import { Route, Switch } from "react-router-dom";
import { URLS_FOR_FOOTER, URLS_FOR_HEADER } from "../../utils/constants";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
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
      <Route exact path={URLS_FOR_HEADER}>
        <Header />
      </Route>
      <main>
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
      </main>
      <Route exact path={URLS_FOR_FOOTER}>
        <Footer />
      </Route>
      <PopupWithInfo isOpen={isOpen} onClose={onClose} infoMessage={infoMessage} onCLoseOverlay={onCLoseOverlay} isError={isError}/>
    </>
  )
};

export default MainPage;