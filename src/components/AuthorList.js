import React from 'react';

function AuthorList({ authors, editAuthor, deleteAuthor }) {
  return (
    <ul>
      {authors.map(author => (
        <li key={author._id}>
          {author.name}
          <button onClick={() => {
            const newName = prompt("Edit author name:", author.name);
            if (newName) {
              editAuthor(author._id, newName);
            }
          }}>
            Edit
          </button>
          <button onClick={() => deleteAuthor(author._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default AuthorList;
