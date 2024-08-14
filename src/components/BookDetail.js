import React, { useState, useEffect } from 'react';
import BookService from '../BookService';
import { useParams } from 'react-router-dom';
import './styles.css';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      BookService.getBookById(id)
        .then((response) => {
          setBook(response.data);
          setError('');
        })
        .catch(() => {
          setError('Book not found or an error occurred.');
          setBook(null);
        });
    }
  }, [id]);

  const handleRent = () => {
    BookService.rentBook(id)
      .then((response) => {
        setBook(response.data);
        setMessage('Book rented successfully.');
      })
      .catch(() => {
        setMessage('Failed to rent the book.');
      });
  };

  const handleReturn = () => {
    BookService.returnBook(id)
      .then((response) => {
        setBook(response.data);
        setMessage('Book returned successfully.');
      })
      .catch(() => {
        setMessage('Failed to return the book.');
      });
  };

  return (
    <div className="container">
      <h2>Book Details</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      {book && (
        <div className="book-details">
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Year:</strong> {book.year}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Price:</strong> ${book.price}</p>
          <p><strong>Quantity:</strong> {book.quantity}</p>
          <p><strong>Rented:</strong> {book.rented ? 'Yes' : 'No'}</p>
          <img src={`data:image/png;base64,${book.base64QrCode}`} alt="QR Code" />
          <div className="actions">
            {!book.rented ? (
              <button onClick={handleRent}>Rent</button>
            ) : (
              <button onClick={handleReturn}>Return</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
