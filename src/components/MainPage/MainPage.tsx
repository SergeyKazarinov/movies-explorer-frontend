import { FC, MouseEvent } from "react";
import { Route, Switch } from "react-router-dom";
import { URLS_FOR_FOOTER, URLS_FOR_HEADER } from "../../utils/constants";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import PopupWithInfo from "../UI/PopupWithInfo/PopupWithInfo";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import Movie from "../Movie/Movie";
import Profile from "../Profile/Profile";

interface IMainPageProps {
  onSignOut: () => void;
  isOpen: boolean;
  onClose: () => void;
  infoMessage: string;
  onCloseOverlay: (e: MouseEvent<HTMLElement>) => void;
  isError: boolean;
}

const MainPage: FC<IMainPageProps> = ({
    onSignOut,
    isOpen,
    onClose,
    infoMessage,
    onCloseOverlay,
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
            exact path="/movies"
            component={Movies}
          />
          <Route path='/movies/:id'>
            <Movie />
          </Route>
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
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
          <Route path="/movies/*">
            <PageNotFound />
          </Route>
        </Switch>
      </main>
      <Route exact path={URLS_FOR_FOOTER}>
        <Footer />
      </Route>
      <PopupWithInfo 
        isOpen={isOpen}
        onClose={onClose}
        infoMessage={infoMessage}
        onCloseOverlay={onCloseOverlay}
        isError={isError}
      />
    </>
  )
};

export default MainPage;