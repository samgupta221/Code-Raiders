import React, { useState } from 'react';

const SwapsList = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  
  const [ongoingSwaps] = useState([
    {
      id: 1,
      itemOffered: "Black Formal Shirt",
      itemRequested: "Casual T-Shirt",
      partner: "Alice Johnson",
      status: "Pending Approval",
      dateInitiated: "2024-06-10"
    }
  ]);

  const [completedSwaps] = useState([
    {
      id: 1,
      itemOffered: "White Sneakers",
      itemReceived: "Brown Loafers",
      partner: "Bob Smith",
      completionDate: "2024-05-20",
      rating: 5
    },
    {
      id: 2,
      itemOffered: "Red Dress",
      itemReceived: "Blue Skirt",
      partner: "Carol Davis",
      completionDate: "2024-04-15",
      rating: 4
    }
  ]);

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="swaps-list">
      <div className="section-header">
        <h2>Your Swaps</h2>
        <div className="swap-tabs">
          <button 
            className={`tab-btn ${activeTab === 'ongoing' ? 'active' : ''}`}
            onClick={() => setActiveTab('ongoing')}
          >
            Ongoing ({ongoingSwaps.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({completedSwaps.length})
          </button>
        </div>
      </div>

      {activeTab === 'ongoing' && (
        <div className="ongoing-swaps">
          {ongoingSwaps.map(swap => (
            <div key={swap.id} className="swap-card">
              <div className="swap-header">
                <h3>Swap with {swap.partner}</h3>
                <span className="swap-status">{swap.status}</span>
              </div>
              
              <div className="swap-details">
                <div className="swap-item">
                  <span className="label">You're offering:</span>
                  <span className="value">{swap.itemOffered}</span>
                </div>
                <div className="swap-arrow">↔</div>
                <div className="swap-item">
                  <span className="label">You're requesting:</span>
                  <span className="value">{swap.itemRequested}</span>
                </div>
              </div>
              
              <div className="swap-footer">
                <span className="swap-date">
                  Initiated: {new Date(swap.dateInitiated).toLocaleDateString()}
                </span>
                <div className="swap-actions">
                  <button className="btn btn--small btn--outline">View Details</button>
                  <button className="btn btn--small btn--secondary">Cancel</button>
                </div>
              </div>
            </div>
          ))}
          
          {ongoingSwaps.length === 0 && (
            <div className="empty-state">
              <p>No ongoing swaps at the moment.</p>
              <button className="btn btn--primary">Start a Swap</button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="completed-swaps">
          {completedSwaps.map(swap => (
            <div key={swap.id} className="swap-card completed">
              <div className="swap-header">
                <h3>Swap with {swap.partner}</h3>
                <span className="swap-rating">{renderStars(swap.rating)}</span>
              </div>
              
              <div className="swap-details">
                <div className="swap-item">
                  <span className="label">You gave:</span>
                  <span className="value">{swap.itemOffered}</span>
                </div>
                <div className="swap-arrow">↔</div>
                <div className="swap-item">
                  <span className="label">You received:</span>
                  <span className="value">{swap.itemReceived}</span>
                </div>
              </div>
              
              <div className="swap-footer">
                <span className="swap-date">
                  Completed: {new Date(swap.completionDate).toLocaleDateString()}
                </span>
                <div className="swap-actions">
                  <button className="btn btn--small btn--outline">View Details</button>
                  <button className="btn btn--small btn--primary">Swap Again</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SwapsList;
