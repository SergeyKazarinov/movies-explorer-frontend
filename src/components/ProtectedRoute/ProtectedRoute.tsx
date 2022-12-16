import { FC } from "react";
import { Redirect, Route } from "react-router-dom"
import { useAppSelector } from "../../hooks/useTypedSelector";
import { IProfile } from "../Profile/Profile";

interface IProtectedRoute {
  component: FC | FC<IProfile>;
  path: string;
  exact?: boolean
  onSignOut?: () => void;
}

const ProtectedRoute: FC<IProtectedRoute> = ({component: Component, ...props}) => {
  const {loggedIn} = useAppSelector(state => state.user)
  return (
    <Route>
      {() => 
        loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  )
}

export default ProtectedRoute;