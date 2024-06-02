import React, { useState } from 'react';

function AuthorForm({ addAuthor }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      addAuthor(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button type="submit">Add Author</button>
    </form>
  );
}

export default AuthorForm;
