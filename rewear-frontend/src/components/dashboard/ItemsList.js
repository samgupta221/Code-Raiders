import React, { useState } from 'react';

const ItemsList = () => {
  const [items] = useState([
    {
      id: 1,
      title: "Black Formal Shirt",
      size: "Large",
      condition: "Excellent",
      points: 100,
      status: "Available",
      dateUploaded: "2024-06-01",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Blue Jeans",
      size: "32",
      condition: "Good",
      points: 80,
      status: "In Negotiation",
      dateUploaded: "2024-05-15",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'green';
      case 'In Negotiation': return 'orange';
      case 'Swapped': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <div className="items-list">
      <div className="section-header">
        <h2>Your Listed Items</h2>
        <button className="btn btn--primary">Add New Item</button>
      </div>

      <div className="items-grid">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <div className="item-image">
              <img src={item.image} alt={item.title} />
              <div className={`item-status status-${getStatusColor(item.status)}`}>
                {item.status}
              </div>
            </div>
            
            <div className="item-content">
              <h3>{item.title}</h3>
              <div className="item-details">
                <span>Size: {item.size}</span>
                <span>Condition: {item.condition}</span>
                <span className="item-points">{item.points} points</span>
              </div>
              <div className="item-date">
                Listed: {new Date(item.dateUploaded).toLocaleDateString()}
              </div>
            </div>
            
            <div className="item-actions">
              <button className="btn btn--small btn--outline">Edit</button>
              <button className="btn btn--small btn--secondary">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="empty-state">
          <p>You haven't listed any items yet.</p>
          <button className="btn btn--primary">List Your First Item</button>
        </div>
      )}
    </div>
  );
};

export default ItemsList;
