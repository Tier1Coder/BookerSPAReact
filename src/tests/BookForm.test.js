import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import BookForm from '../components/BookForm.js';

const authors = [
  { _id: '1', name: 'Author 1' },
  { _id: '2', name: 'Author 2' },
];

test('renders BookForm with inputs and button', () => {
  render(<BookForm addBook={jest.fn()} authors={authors} />);

  expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
  expect(screen.getByRole('combobox')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Add Book/i })).toBeInTheDocument();

  authors.forEach(author => {
    expect(screen.getByText(author.name)).toBeInTheDocument();
  });
});

test('submits the form with title and author', async () => {
  const addBook = jest.fn();
  const user = userEvent.setup();
  render(<BookForm addBook={addBook} authors={authors} />);

  const titleInput = screen.getByPlaceholderText('Title');
  await user.type(titleInput, 'New Book');

  const authorSelect = screen.getByRole('combobox');
  await user.selectOptions(authorSelect, '1');

  const addButton = screen.getByRole('button', { name: /Add Book/i });
  await user.click(addButton);

  expect(addBook).toHaveBeenCalledWith('New Book', '1');

  expect(titleInput).toHaveValue('');
  expect(authorSelect).toHaveValue('');
});

test('shows alert when form is incomplete', async () => {
  const addBook = jest.fn();
  const user = userEvent.setup();
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<BookForm addBook={addBook} authors={authors} />);

  const addButton = screen.getByRole('button', { name: /Add Book/i });
  await user.click(addButton);

  expect(window.alert).toHaveBeenCalledWith('Please enter both title and author');
  expect(addBook).not.toHaveBeenCalled();

  window.alert.mockRestore();
});
