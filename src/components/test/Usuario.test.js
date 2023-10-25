import { render, screen } from '@testing-library/react';
import Usuario from '../Usuario';

test('renders learn react link', () => {
  render(<Usuario />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
