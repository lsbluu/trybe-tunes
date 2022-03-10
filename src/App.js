import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/profile" component={ Favorites } />
        <Route path="/search" component={ Search } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
