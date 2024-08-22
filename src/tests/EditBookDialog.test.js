import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import EditBookDialog from '../components/EditBookDialog.js';

const book = {
  _id: '1',
  title: 'Sample Book',
  author: { _id: '1', name: 'Author 1' },
};

const authors = [
  { _id: '1', name: 'Author 1' },
  { _id: '2', name: 'Author 2' },
];

test('renders EditBookDialog with book details', () => {
  render(<EditBookDialog book={book} authors={authors} submitEditBook={jest.fn()} closeDialog={jest.fn()} />);

  expect(screen.getByLabelText('Book Title:')).toHaveValue(book.title);
  expect(screen.getByLabelText('Book Author:')).toHaveValue(book.author._id);

  authors.forEach(author => {
    expect(screen.getByText(author.name)).toBeInTheDocument();
  });
});

test('submits the edited book details', async () => {
  const submitEditBook = jest.fn();
  const user = userEvent.setup();

  render(<EditBookDialog book={book} authors={authors} submitEditBook={submitEditBook} closeDialog={jest.fn()} />);

  await user.clear(screen.getByLabelText('Book Title:'));
  await user.type(screen.getByLabelText('Book Title:'), 'Updated Book Title');

  await user.selectOptions(screen.getByLabelText('Book Author:'), '2');

  await user.click(screen.getByText('Save Changes'));

  expect(submitEditBook).toHaveBeenCalledWith(book._id, 'Updated Book Title', '2');
});

test('cancels editing the book', async () => {
  const closeDialog = jest.fn();
  const user = userEvent.setup();

  render(<EditBookDialog book={book} authors={authors} submitEditBook={jest.fn()} closeDialog={closeDialog} />);

  await user.click(screen.getByText('Cancel'));

  expect(closeDialog).toHaveBeenCalled();
});
