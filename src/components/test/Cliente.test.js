import { render, screen } from '@testing-library/react';
import Cliente from '../Cliente';

test('renders learn react link', () => {
  render(<Cliente />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
