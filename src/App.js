import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import Register from './components/Register';
import Login from './components/Login';
import BookDetail from './components/BookDetail'; // Import the BookDetail component
import BookService from './BookService'; // Import the BookService
import './components/styles.css'; // Import the styles

function App() {
  const username = localStorage.getItem('username'); // Retrieve the username

  const handleLogout = () => {
    BookService.logout();
    window.location.href = '/login'; // Ensure the page refreshes to reflect logout
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  Books
                </NavLink>
              </li>
              <li>
                <NavLink to="/add" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  Add Book
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  Login
                </NavLink>
              </li>
              {username && (
                <>
                  <li style={{ marginLeft: 'auto' }}>
                    <span>Welcome, {username}</span>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<BookList />} />
            <Route exact path="/add" element={<BookForm />} />
            <Route exact path="/edit/:id" element={<BookForm />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/books/:id" element={<BookDetail />} /> {/* Route to BookDetail */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
