import { render, screen } from '@testing-library/react';
import Appbar from '../Appbar';

test('renders learn react link', () => {
  render(<Appbar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
