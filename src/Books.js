import React, { useEffect, useState } from 'react';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('/books/v2')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    return (
        <div>
            <h1>Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>{book.title} by {book.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default Books;