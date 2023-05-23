import React, { Component } from 'react';
import axios from 'axios';
import '../styles/BooksList.css';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { FaRegBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class BooksList extends Component {
  state = {
    books: [],
    savedBooks: [],
  };

  componentDidMount() {
    axios.get('http://localhost:5000/books')
      .then(response => {
        this.setState({ books: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSaveBook = book => {
    if (!this.state.savedBooks.find(savedBook => savedBook._id === book._id)) {
      const updatedBook = { ...book, savedBook: true };

      this.setState(prevState => ({
        savedBooks: [...prevState.savedBooks, updatedBook],
      }), () => {
        console.log(this.state.savedBooks);
        this.props.handleSaveBook(updatedBook);
        toast.success('Book saved successfully!', {
          autoClose: 1000, // Set the duration in milliseconds (e.g., 3000ms = 3 seconds)
        });
      });
    } else {
      this.setState(prevState => ({
        savedBooks: prevState.savedBooks.filter(savedBook => savedBook._id !== book._id),
      }));
    }
  };

  render() {
    const { books, savedBooks } = this.state;
    return (
      <div className="books-list-container">
        <h2>Book List</h2>

        <Grid container spacing={2}>
          {books.map(book => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
              <div className="book-item">
                <div className="book-image">
                  <img src={book.coverImage} alt={book.title} />
                </div>
                <h3>{book.title}</h3>
                <p><Link to={`/authors/${encodeURIComponent(book.author)}`}>{book.author}</Link></p>
                <p>Category: {book.category}</p>
                <Link to={`/${book._id}`} className="more-button">Details</Link>
                <Link to={`/book-ratings/${book._id}`} className="rating-button">Review</Link>
                <button
                  className={`save-button ${savedBooks.find(savedBook => savedBook._id === book._id) ? 'saved' : ''}`}
                  onClick={() => this.handleSaveBook(book)}
                >
                  <FaRegBookmark className="bookmark-icon" />
                </button>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
