import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Header from '../components/Header.js';

test('headers buttons presence', () => {
  render(<Header setShowAuthorSection={jest.fn()} />);

  const buttonAuthors = screen.getByRole('button', { name: 'Authors' });
  const buttonBooks = screen.getByRole('button', { name: 'Books' });

  expect(buttonAuthors).toBeInTheDocument();
  expect(buttonBooks).toBeInTheDocument();
});

test('authors button clicked', async () => {
  const setShowAuthorSection = jest.fn();
  const user = userEvent.setup();
  render(<Header setShowAuthorSection={setShowAuthorSection} />);

  const buttonAuthors = screen.getByRole('button', { name: 'Authors' });

  await user.click(buttonAuthors);

  expect(setShowAuthorSection).toHaveBeenCalledWith(true);
});

test('books button clicked', async () => {
  const setShowAuthorSection = jest.fn();
  const user = userEvent.setup();
  render(<Header setShowAuthorSection={setShowAuthorSection} />);

  const buttonBooks = screen.getByRole('button', { name: 'Books' });

  await user.click(buttonBooks);

  expect(setShowAuthorSection).toHaveBeenCalledWith(false);
});
