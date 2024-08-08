import React, { useState, useEffect } from 'react';
import BookService from '../BookService';
import { Link } from 'react-router-dom';
import './styles.css'; // Import the styles.css file

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    BookService.getBooks()
      .then((response) => {
        console.log('Books fetched:', response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the books!', error);
      });
  };

  const deleteBook = (id) => {
    BookService.deleteBook(id).then(() => {
      loadBooks();
    });
  };

  return (
    <div className="container">
      <h2>Book List</h2>
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Year:</strong> {book.year}</p>
            <img src={`data:image/png;base64,${book.base64QrCode}`} alt="QR Code" />
            <div className="actions">
              <button onClick={() => deleteBook(book.id)}>Delete</button>
              <Link to={`/edit/${book.id}`}>
                <button>Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
