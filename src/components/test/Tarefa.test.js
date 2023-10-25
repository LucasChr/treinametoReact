import { render, screen } from '@testing-library/react';
import Tarefa from '../Tarefa';

test('renders learn react link', () => {
  render(<Tarefa />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
