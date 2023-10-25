import { render, screen } from '@testing-library/react';
import Registrodia from '../Registrodia';

test('renders learn react link', () => {
  render(<Registrodia />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
