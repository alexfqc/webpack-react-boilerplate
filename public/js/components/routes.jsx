import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Main from './Main';
import Other from './Other';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="other" component={Other} />
  </Route>
);
