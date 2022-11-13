import './App.css';
import Main from '../Main/Main';
import { Switch, Route } from 'react-router-dom';
import Movies from '../Movies/Movies';

const App = () => {
  return (
    <div className='app'>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
