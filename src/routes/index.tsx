import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import App from '../pages/app/App';

const Root: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Root;
