import { render, screen } from '@testing-library/react';
import Gomoku from './Gomoku';

test('renders learn react link', () => {
  render(<Gomoku />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
