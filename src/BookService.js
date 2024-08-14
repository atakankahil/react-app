import axios from 'axios';

const API_URL = 'http://localhost:8080/books';
const API_URL_AUTH = 'http://localhost:8080/auth';

class BookService {
  async getBooks() {
    try {
      console.log("Fetching books with headers:", this.authHeader());
      return await axios.get(API_URL, { headers: this.authHeader() });
    } catch (error) {
      this.handleError(error);
    }
  }

  async getBookById(id) {
    try {
      console.log("Fetching book by id:", id, "with headers:", this.authHeader());
      return await axios.get(`${API_URL}/${id}`, { headers: this.authHeader() });
    } catch (error) {
      this.handleError(error);
    }
  }

  async createBook(book) {
    try {
      console.log("Creating book:", book, "with headers:", this.authHeader());
      return await axios.post(API_URL, book, { headers: this.authHeader() });
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateBook(id, book) {
    try {
      console.log("Updating book id:", id, "with data:", book, "and headers:", this.authHeader());
      return await axios.put(`${API_URL}/${id}`, book, { headers: this.authHeader() });
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteBook(id) {
    try {
      console.log("Deleting book id:", id, "with headers:", this.authHeader());
      return await axios.delete(`${API_URL}/${id}`, { headers: this.authHeader() });
    } catch (error) {
      this.handleError(error);
    }
  }

  // New method for renting a book
  async rentBook(id) {
    try {
      console.log("Renting book id:", id, "with headers:", this.authHeader());
      return await axios.post(`${API_URL}/${id}/rent`, null, { headers: this.authHeader() });
    } catch (error) {
      this.handleError(error);
    }
  }

  // New method for returning a book
  async returnBook(id) {
    try {
      console.log("Returning book id:", id, "with headers:", this.authHeader());
      return await axios.post(`${API_URL}/${id}/return`, null, { headers: this.authHeader() });
    } catch (error) {
      this.handleError(error);
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const response = await axios.post(`${API_URL_AUTH}/refresh-token`, {
        refreshToken: refreshToken,
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      console.log("Token refreshed successfully.");
      return true;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      this.logout();
      return false;
    }
  }

  authHeader() {
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: 'Bearer ' + token } : {};
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username'); // Clear the username from localStorage
    window.location.href = '/login'; // Redirect to login page
  }

  handleError(error) {
    if (error.response) {
      if (error.response.status === 403) {
        alert('Access Denied: ' + error.response.data);
        this.logout(); // Redirect to login
      } else {
        alert('An error occurred: ' + error.response.data);
      }
    } else if (error.request) {
      alert('No response received from the server.');
    } else {
      alert('An error occurred: ' + error.message);
    }
  }
}

// Assign the instance to a variable before exporting
const bookServiceInstance = new BookService();
export default bookServiceInstance;
