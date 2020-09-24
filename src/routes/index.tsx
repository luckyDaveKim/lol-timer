import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import DashboardRoute from './dashboard';

const Root: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <DashboardRoute />
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Root;
