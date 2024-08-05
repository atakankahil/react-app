import React, { useState, useEffect } from 'react';
import BookService from '../BookService';
import { useParams, useNavigate } from 'react-router-dom';

const BookForm = () => {
  const [book, setBook] = useState({ title: '', author: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      BookService.getBookById(id)
        .then((response) => {
          setBook(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the book!', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      BookService.updateBook(id, book).then(() => {
        navigate('/');
      });
    } else {
      BookService.createBook(book).then(() => {
        navigate('/');
      });
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={book.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="int"
            name="year"
            value={book.year}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="double"
            name="price"
            value={book.price}
            onChange={handleChange}
          />
        </div>
      
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BookForm;
