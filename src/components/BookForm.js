import React, { useState } from 'react';

function BookForm({ addBook, authors }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      addBook(title, author);
      setTitle('');
      setAuthor('');
    } else {
      alert('Please enter both title and author');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <select value={author} onChange={(e) => setAuthor(e.target.value)}>
        <option value="">Select an author</option>
        {authors.map(author => (
          <option key={author._id} value={author._id}>{author.name}</option>
        ))}
      </select>
      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;
