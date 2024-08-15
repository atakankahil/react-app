import React, { useState, useEffect } from 'react';
import BookService from '../BookService';
import { Link } from 'react-router-dom';
import './styles.css'; 

const RentedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadRentedBooks();
  }, []);

  const loadRentedBooks = () => {
    BookService.getRentedBooks()
      .then((response) => {
        console.log('Rented books fetched:', response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the rented books!', error);
      });
  };

  const returnBook = (id) => {
    BookService.returnBook(id).then(() => {
      loadRentedBooks(); // Reload the list after returning a book
    });
  };

  return (
    <div className="container">
      <h2>Rented Books</h2>
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <Link to={`/books/${book.id}`}>
              <h3>{book.title}</h3>
            </Link>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Year:</strong> {book.year}</p>
            <p><strong>Quantity:</strong> {book.quantity}</p>
            <img src={`data:image/png;base64,${book.base64QrCode}`} alt="QR Code" />
            <div className="actions">
              <button onClick={() => returnBook(book.id)}>Return Book</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentedBooks;
