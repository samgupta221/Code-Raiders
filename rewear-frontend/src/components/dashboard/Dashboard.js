import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfileSection from './ProfileSection';
import ItemsList from './ItemsList';
import SwapsList from './SwapsList';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'items', label: 'My Items', icon: '👕' },
    { id: 'swaps', label: 'Swaps', icon: '🔄' }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <header className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <div className="points-display">
            <span className="points-label">Your Points:</span>
            <span className="points-value">{user?.points || 0}</span>
          </div>
        </header>

        <nav className="dashboard-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <main className="dashboard-content">
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'items' && <ItemsList />}
          {activeTab === 'swaps' && <SwapsList />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
