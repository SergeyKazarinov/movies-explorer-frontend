import { useContext } from "react"
import { Redirect, Route } from "react-router-dom"
import { LoggedInContext } from "../../context/LoggedInContext"


const ProtectedRoute = ({component: Component, ...props}) => {
  const loggedIn = useContext(LoggedInContext);
  return (
    <Route>
      {() => 
        loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  )
}

export default ProtectedRoute;