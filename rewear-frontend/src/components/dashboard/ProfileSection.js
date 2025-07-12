import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfileSection = () => {
  const { user } = useAuth();

  return (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <p>Member since: {new Date(user?.memberSince).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Points Balance</h3>
            <p className="stat-value">{user?.points || 0}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>Total Swaps</h3>
            <p className="stat-value">12</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Sustainability Score</h3>
            <p className="stat-value">85%</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">👕</div>
          <div className="stat-content">
            <h3>Items Listed</h3>
            <p className="stat-value">8</p>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="btn btn--primary">Edit Profile</button>
        <button className="btn btn--outline">Account Settings</button>
      </div>
    </div>
  );
};

export default ProfileSection;
