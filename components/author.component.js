import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Author() {
  const [author, setAuthor] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/authors/${name}`)
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name]);

  return (
    <div className="author-detail-container">
{author && (
  <>
    <h3 className="author-detail-name">{author.name}</h3>
    <p className="author-detail-bio">{author.bio}</p>
    {author.books && (
      <>
        <h4 className="author-detail-books-header">Books:</h4>
        <ul className="author-detail-books">
          {author.books.map((book) => (
            <li key={book._id}>{book.title}</li>
          ))}
        </ul>
      </>
    )}
  </>
)}
    </div>
  );
}
