import { render, screen } from '@testing-library/react';
import Projeto from '../Projeto';

test('renders learn react link', () => {
  render(<Projeto />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
