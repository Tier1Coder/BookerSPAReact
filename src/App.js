import React, { useState, useEffect } from 'react';
import AuthorForm from './components/AuthorForm.js';
import AuthorList from './components/AuthorList.js';
import BookForm from './components/BookForm.js';
import BookList from './components/BookList.js';
import EditBookDialog from './components/EditBookDialog.js';
import Header from './components/Header.js';

function App() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [showAuthorSection, setShowAuthorSection] = useState(true);
  const [currentBook, setCurrentBook] = useState(null);

  useEffect(() => {
    fetchAuthors();
    fetchBooks();
  }, []);

  const fetchAuthors = () => {
    fetch('http://localhost:3000/api/authors')
      .then(response => response.json())
      .then(data => setAuthors(data))
      .catch(error => console.error('Error fetching authors:', error));
  };

  const fetchBooks = () => {
    fetch('http://localhost:3000/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  };

  const handleAddAuthor = (name) => {
    fetch('http://localhost:3000/api/authors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(newAuthor => {
        setAuthors([...authors, newAuthor]);
      })
      .catch(error => console.error('Error adding author:', error));
  };

  const handleAddBook = (title, author) => {
    fetch('http://localhost:3000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author })
    })
      .then(response => response.json())
      .then(newBook => {
        setBooks([...books, newBook]);
      })
      .catch(error => console.error('Error adding book:', error));
  };

  const handleDeleteAuthor = (authorId) => {
    fetch(`http://localhost:3000/api/authors/${authorId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => { throw new Error(error.message); });
        }
        setAuthors(authors.filter(author => author._id !== authorId));
      })
      .catch(error => {
        if (error.message === 'Cannot delete author with assigned books') {
          alert('Cannot delete author with assigned books');
        } else {
          console.error('Error deleting author:', error);
        }
      });
  };

  const handleDeleteBook = (bookId) => {
    fetch(`http://localhost:3000/api/books/${bookId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setBooks(books.filter(book => book._id !== bookId));
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  const handleEditAuthor = (authorId, newName) => {
    fetch(`http://localhost:3000/api/authors/${authorId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    })
      .then(() => {
        setAuthors(authors.map(author => author._id === authorId ? { ...author, name: newName } : author));
      })
      .catch(error => console.error('Error editing author:', error));
  };

  const handleEditBook = (bookId, newTitle, newAuthor) => {
    fetch(`http://localhost:3000/api/books/${bookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, author: newAuthor })
    })
      .then(() => {
        setBooks(books.map(book => book._id === bookId ? { ...book, title: newTitle, author: newAuthor } : book));
        setCurrentBook(null);
      })
      .catch(error => console.error('Error editing book:', error));
  };

  return (
    <div>
      <Header
        setShowAuthorSection={setShowAuthorSection}
      />
      {showAuthorSection ? (
        <div id="author-section">
          <AuthorForm addAuthor={handleAddAuthor} />
          <AuthorList
            authors={authors}
            editAuthor={handleEditAuthor}
            deleteAuthor={handleDeleteAuthor}
          />
        </div>
      ) : (
        <div id="book-section">
          <BookForm addBook={handleAddBook} authors={authors} />
          <BookList
            books={books}
            editBook={setCurrentBook}
            deleteBook={handleDeleteBook}
          />
        </div>
      )}
      {currentBook && (
        <EditBookDialog
          book={currentBook}
          authors={authors}
          submitEditBook={handleEditBook}
          closeDialog={() => setCurrentBook(null)}
        />
      )}
    </div>
  );
}

export default App;
