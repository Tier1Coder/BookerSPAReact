import React from 'react';

function BookList({ books, editBook, deleteBook }) {
  return (
    <ul>
      {books.map(book => (
        <li key={book._id}>
          <div className="li-content">
            <span>{book.title} by {book.author ? book.author.name : 'unknown'}</span>
            <div className="li-buttons">
              <button onClick={() => editBook(book)}>Edit</button>
              <button onClick={() => deleteBook(book._id)}>Delete</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
