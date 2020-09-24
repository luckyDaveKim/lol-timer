import React from 'react';
import { render } from '@testing-library/react';
import DashboardPage from './DashboardPage';

test('renders learn react link', () => {
  const { getByText } = render(<DashboardPage />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
