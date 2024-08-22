import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthorForm from '../components/AuthorForm.js';

test('renders AuthorForm and adds an author', () => {
  const addAuthor = jest.fn();
  render(<AuthorForm addAuthor={addAuthor} />);

  const input = screen.getByPlaceholderText('Name');
  const button = screen.getByText('Add Author');

  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  fireEvent.change(input, { target: { value: 'New Author' } });
  fireEvent.click(button);

  expect(addAuthor).toHaveBeenCalledWith('New Author');

  expect(input.value).toBe('');
});
