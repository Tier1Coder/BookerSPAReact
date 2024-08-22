import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthorList from '../components/AuthorList.js';

const authors = [
  { _id: '1', name: 'Author 1' },
  { _id: '2', name: 'Author 2' },
];

test('renders AuthorList and handles edit and delete', () => {
  const editAuthor = jest.fn();
  const deleteAuthor = jest.fn();

  render(<AuthorList authors={authors} editAuthor={editAuthor} deleteAuthor={deleteAuthor} />);

  expect(screen.getByText('Author 1')).toBeInTheDocument();
  expect(screen.getByText('Author 2')).toBeInTheDocument();

  window.prompt = jest.fn().mockImplementation(() => 'New Author 1');
  fireEvent.click(screen.getAllByText('Edit')[0]);
  expect(editAuthor).toHaveBeenCalledWith('1', 'New Author 1');

  fireEvent.click(screen.getAllByText('Delete')[0]);
  expect(deleteAuthor).toHaveBeenCalledWith('1');
});
