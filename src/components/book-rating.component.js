import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';

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
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
        <h3>Rate this book:</h3>
      <Rating onClick={handleRating} ratingValue={rating} />
      <form onSubmit={handleSubmit}>
        <label>
          Leave a review:
          <input type="text" placeholder="This field is optional" value={review} onChange={handleReview} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookRating;
