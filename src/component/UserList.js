import React from 'react';

function UserList({ users, onDeleteUser, loading }) {
  if (loading) {
    return (
      <div className="user-list">
        <h2>User List</h2>
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h2>User List</h2>
      <p className="user-count">Total Users: {users.length}</p>
      
      {users.length === 0 ? (
        <div className="no-users">
          No users found. Add User
        </div>
      ) : (
        users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-info">
              <h3>{user.name}</h3>
              <div className="user-details">
                <div className="user-detail">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="user-detail">
                  <strong>Age:</strong> {user.age}
                </div>
                <div className="user-detail">
                  <strong>City:</strong> {user.city}
                </div>
              </div>
            </div>
            <button 
              className="btn-delete" 
              onClick={() => onDeleteUser(user._id)}
            >
               Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default UserList;