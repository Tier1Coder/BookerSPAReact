import React, { useState, useEffect } from 'react';

function EditBookDialog({ book, authors, submitEditBook, closeDialog }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author ? book.author._id : '');

  const handleSubmit = () => {
    submitEditBook(book._id, title, author);
  };

  return (
    <div style={{ display: 'block', position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', border: '1px solid #ccc', padding: '20px', backgroundColor: 'white', zIndex: 1000 }}>
      <form>
        <label htmlFor="editBookTitle">Book Title:</label>
        <input
          type="text"
          id="editBookTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />
        <label htmlFor="editBookAuthor">Book Author:</label>
        <select
          id="editBookAuthor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          {authors.map(author => (
            <option key={author._id} value={author._id}>{author.name}</option>
          ))}
        </select>
        <br /><br />
        <button type="button" onClick={handleSubmit}>Save Changes</button>
        <button type="button" onClick={closeDialog}>Cancel</button>
      </form>
    </div>
  );
}

export default EditBookDialog;
