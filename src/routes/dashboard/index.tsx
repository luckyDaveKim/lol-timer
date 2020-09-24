import React from 'react';
import { Route } from 'react-router-dom';
import DashboardPage from '../../pages/dashboard/DashboardPage';

const DashboardRoute: React.FC = () => (
  <Route path="/" exact component={DashboardPage} />
);

export default DashboardRoute;
