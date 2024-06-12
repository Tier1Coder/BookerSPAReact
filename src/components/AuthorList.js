import React from 'react';

function AuthorList({ authors, editAuthor, deleteAuthor }) {
  return (
    <ul>
      {authors.map(author => (
        <li key={author._id}>
          <div className="li-content">
            <span>{author.name}</span>
            <div className="li-buttons">
              <button onClick={() => {
                const newName = prompt("Edit author name:", author.name);
                if (newName) {
                  editAuthor(author._id, newName);
                }
              }}>
                Edit
              </button>
              <button onClick={() => deleteAuthor(author._id)}>Delete</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default AuthorList;
