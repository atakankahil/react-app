import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editUsername, setEditUsername] = useState({}); // State to manage the username input
  const userRole = localStorage.getItem('userRole'); // Get the current user's role

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/all-users', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
      });
      setUsers(response.data);
    } catch (error) {
      setError('Failed to load users');
      console.error('Error fetching users:', error);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await axios.put(`http://localhost:8080/auth/all-users/${id}`, { userRole: role }, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
      });
      loadUsers(); // Reload users after updating the role
    } catch (error) {
      setError('Failed to update user role');
      console.error('Error updating user role:', error);
    }
  };

  const handleUsernameChange = (id, newUsername) => {
    setEditUsername((prev) => ({ ...prev, [id]: newUsername }));
  };

  const handleUpdateUsername = async (id) => {
    try {
      await axios.put(`http://localhost:8080/auth/all-users/${id}`, { username: editUsername[id] }, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
      });
      loadUsers(); // Reload users after updating the username
      setEditUsername((prev) => ({ ...prev, [id]: '' })); // Clear the input field
    } catch (error) {
      setError('Failed to update username');
      console.error('Error updating username:', error);
    }
  };

  return (
    <div className="container">
      <h2>User List</h2>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {userRole === 'ADMIN' ? (
                  <input
                    type="text"
                    value={editUsername[user.id] || user.username}
                    onChange={(e) => handleUsernameChange(user.id, e.target.value)}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>{user.userRole}</td>
              <td>
                {userRole === 'ADMIN' && (
                  <>
                    <button onClick={() => handleUpdateUsername(user.id)}>Update Username</button>
                    <button onClick={() => handleRoleChange(user.id, 'ADMIN')}>Make Admin</button>
                    <button onClick={() => handleRoleChange(user.id, 'USER')}>Make User</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
