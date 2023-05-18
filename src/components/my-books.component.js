import React from 'react';
import '../styles/MyBook.css';

function MyBooks({ savedBooks }) {
  return (
    <div className="my-books-container">
      <h2 className="my-books-title">My Books</h2>
      {savedBooks.length > 0 ? (
        <ul className="my-books-list">
          {savedBooks.map(book => (
            <li key={book.title} className="my-books-list-item">{book.title}</li>
          ))}
        </ul>
      ) : (
        <p className="my-books-no-books">No saved books.</p>
      )}
    </div>
  );
}

export default MyBooks;
