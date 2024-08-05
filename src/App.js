import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Books</Link>
              </li>
              <li>
                <Link to="/add">Add Book</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<BookList />} />
            <Route exact path="/add" element={<BookForm />} />
            <Route exact path="/edit/:id" element={<BookForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
