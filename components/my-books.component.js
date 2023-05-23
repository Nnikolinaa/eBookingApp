import React, { useState, useEffect } from 'react';
import '../styles/MyBook.css';

function MyBooks({ savedBooks }) {
  const [books, setBooks] = useState(savedBooks);

  const handleRemoveBook = (bookId) => {
    const updatedBooks = books.filter((book) => book._id !== bookId);
    setBooks(updatedBooks);
  };

  const handleStartReading = (bookId) => {
    // Implement the logic to handle the start reading action for the selected book
  };

  useEffect(() => {
    localStorage.setItem('savedBooks', JSON.stringify(books));
  }, [books]);

  return (
    <div className="my-books-container">
      <h2 className="my-books-title">Saved Books</h2>
      {books.length > 0 ? (
        <ul className="my-books-list">
          {books.map((book) => (
            <li key={book._id} className="my-books-list-item">
              <div>
                <img src={book.coverImage} alt={book.title} />
              </div>
              <div>
                <p className="book-title">{book.title}</p>
                <p className="book-author">{book.author}</p>
                <div className="book-buttons">
                  <button onClick={() => handleRemoveBook(book._id)}>Remove</button>
                  <button onClick={() => handleStartReading(book._id)}>Start Reading</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="my-books-no-books">No saved books.</p>
      )}
    </div>
  );
}

export default MyBooks;
