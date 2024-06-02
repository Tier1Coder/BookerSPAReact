import React from 'react';

function Header({ setShowAuthorSection }) {
  return (
    <header>
      <button onClick={() => setShowAuthorSection(true)}>Authors</button>
      <button onClick={() => setShowAuthorSection(false)}>Books</button>
    </header>
  );
}

export default Header;
