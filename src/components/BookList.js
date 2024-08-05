import React, { useState, useEffect } from 'react';
import BookService from '../BookService';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    BookService.getBooks()
      .then((response) => {
        console.log('Books fetched:', response.data); // Add this line
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
    <div>
      <h2>Book List</h2>
      <Link to="/add">
        <button>Add Book</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => deleteBook(book.id)}>Delete</button>
                <Link to={`/edit/${book.id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
