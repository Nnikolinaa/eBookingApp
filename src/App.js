import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar.component';
import BooksList from './components/books-list.component';
import BookDetail from './components/book-detail.component';
import CreateBook from './components/create-book.component';
import BookRating from './components/book-rating.component';
import Author from './components/author.component';
import UserProfile from './components/user-profile.component';
import Login from './components/login.component';
import MyBooks from './components/my-books.component';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState) {
      setIsLoggedIn(JSON.parse(storedLoginState));
    }

    const storedSavedBooks = localStorage.getItem('savedBooks');
    if (storedSavedBooks) {
      setSavedBooks(JSON.parse(storedSavedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
  }, [isLoggedIn, savedBooks]);


  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSaveBook = book => {
    if (!savedBooks.includes(book)) {
      setSavedBooks(prevSavedBooks => [...prevSavedBooks, book]);
    }
  };

  return (
    <Router>
      <ToastContainer />

      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <br />
      <Routes>
        <Route path="/" exact element={<BooksList />} />
        <Route path="/:id" element={<BookDetail />} />
        <Route path="/create" element={<CreateBook />} />
        <Route path="/book-ratings/:id" element={<BookRating />} />
        <Route path="/authors/:name" element={<Author />} />
        <Route path="/signup" element={<UserProfile />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {isLoggedIn && (
          <>
            <Route path="/my-books" element={<MyBooks savedBooks={savedBooks} handleSaveBook={handleSaveBook}/>} />
            <Route
              path="/logout"
              element={
                <div>
                  {/* The handleLogout function is passed to the Navbar component */}
                </div>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
