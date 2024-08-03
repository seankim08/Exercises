import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Carousel title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Shells from far-away beaches/i);
  expect(titleElement).toBeInTheDocument();
});