import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import './components/styles.css'; // Import the styles.css file

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact activeClassName="active">Books</NavLink>
              </li>
              <li>
                <NavLink to="/add" activeClassName="active">Add Book</NavLink>
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
