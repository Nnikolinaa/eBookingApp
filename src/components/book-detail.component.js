import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/BookDetail.css';

export default function BookDetail() {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);


  return (
    <div className="book-detail-container">
      {book && (
        <>
 <div className="book-detail-image">
            <img src={book.coverImage} alt={book.title} />
          </div>
          <h3 className="book-detail-title">Title: <br />{book.title}</h3>
          <p className="book-detail-author">Author: <br />{book.author}</p>
          <p className="book-detail-category">Category: <br />{book.category}</p>
          <p className="book-detail-description">Description: <br />{book.description}</p>
        </>
      )}
    </div>
  );
  
}
