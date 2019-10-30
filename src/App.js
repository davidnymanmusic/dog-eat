import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin/AdminPage';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route path={'/admin'} component={Admin} />
    </Switch>
  </BrowserRouter>
);

export default App;
