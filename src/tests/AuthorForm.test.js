import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthorForm from '../components/AuthorForm.js';

test('renders AuthorForm and adds an author', () => {
  const addAuthor = jest.fn();
  render(<AuthorForm addAuthor={addAuthor} />);

  // Sprawdzenie, czy input i button są wyświetlane
  const input = screen.getByPlaceholderText('Name');
  const button = screen.getByText('Add Author');

  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  // Symulacja wprowadzenia tekstu i kliknięcia buttona
  fireEvent.change(input, { target: { value: 'New Author' } });
  fireEvent.click(button);

  // Sprawdzenie, czy funkcja addAuthor została wywołana z poprawnym argumentem
  expect(addAuthor).toHaveBeenCalledWith('New Author');

  // Sprawdzenie, czy input został wyczyszczony
  expect(input.value).toBe('');
});
