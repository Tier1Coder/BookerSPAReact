import React from 'react';

function BookList({ books, editBook, deleteBook }) {
  return (
    <ul>
      {books.map(book => (
        <li key={book._id}>
          {book.title} by {book.author ? book.author.name : 'unknown'}
          <button onClick={() => editBook(book)}>Edit</button>
          <button onClick={() => deleteBook(book._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
