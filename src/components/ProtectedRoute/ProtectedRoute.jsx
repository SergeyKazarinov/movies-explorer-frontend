import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom"


const ProtectedRoute = ({component: Component, ...props}) => {
  const {loggedIn} = useSelector(state => state.user)
  return (
    <Route>
      {() => 
        loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  )
}

export default ProtectedRoute;