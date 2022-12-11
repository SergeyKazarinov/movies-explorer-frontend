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
    isLoader,
    onError,
    isShort,
    onChange,
    onSignOut,
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
            isLoader={isLoader}
            onError={onError}
            isShort={isShort}
            onChange={onChange}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isLoader={isLoader}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            onSignOut={onSignOut}
          />
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
      </main>
      <Route exact path={URLS_FOR_FOOTER}>
        <Footer />
      </Route>
      <PopupWithInfo isOpen={isOpen} onClose={onClose} infoMessage={infoMessage} onCLoseOverlay={onCLoseOverlay} isError={isError}/>
    </>
  )
};

export default MainPage;