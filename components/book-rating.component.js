import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/BookRating.css';

const BookRating = ({ bookId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    if (bookId) {
      axios.get(`http://localhost:5000/book-ratings/${bookId}`)
        .then(response => {
          const { rating, review } = response.data;
          setRating(rating);
          setReview(review);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [bookId]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleReview = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`http://localhost:5000/book-ratings/${bookId}/rating`, { rating, review })
      .then(response => {
        console.log(response.data);
        toast.success('Review submitted successfully!', { autoClose: 1000 });
        setRating(0); // Reset the rating state
        setReview(''); // Reset the review state
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="book-rating-container">
      <h3 className="rating-heading">Rate this book:</h3>
      <Rating onClick={handleRating} ratingValue={rating} className="star-rating" />
      <form onSubmit={handleSubmit}>
        <label>
          Leave a review:
          <input type="text" placeholder="This field is optional" value={review} onChange={handleReview} className="review-input" />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};
export default BookRating;
