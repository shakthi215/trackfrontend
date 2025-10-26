import React, { useState } from 'react';

function UserForm({ onAddUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    city: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.age || !formData.city) {
      setError('All fields are required!');
      return;
    }

    if (formData.age <= 0) {
      setError('Age must be a positive number!');
      return;
    }

    const result = await onAddUser(formData);
    
    if (result.success) {
      setSuccess('User added successfully! 🎉');
      setFormData({ name: '', email: '', age: '', city: '' });
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="user-form">
      <h2>➕ Add New User</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
          />
        </div>

        <button type="submit" className="btn-submit">
          Add User
        </button>
      </form>
    </div>
  );
}

export default UserForm;