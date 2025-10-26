import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './component/UserForm';
import UserList from './component/UserList';
import './App.css';

const API_URL = 'http://localhost:5000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await axios.post(API_URL, userData);
      setUsers([response.data, ...users]);
      return { success: true };
    } catch (error) {
      console.error('Error adding user:', error);
      return { success: false, message: error.response?.data?.message || 'Error adding user' };
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management System</h1>
      </header>
      
      <div className="container">
        <UserForm onAddUser={addUser} />
        <UserList users={users} onDeleteUser={deleteUser} loading={loading} />
      </div>
    </div>
  );
}

export default App;