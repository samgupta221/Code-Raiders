import React from 'react';
import { useAuth } from '../../context/AuthContext';

const HeroSection = ({ onAuthAction }) => {
  const { user } = useAuth();

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1>Transform Your Wardrobe Sustainably</h1>
          <p>
            Join thousands of fashion-conscious individuals who are reducing textile waste 
            through our innovative clothing exchange platform. Exchange, reuse, and sustain 
            with ReWear.
          </p>
          
          <div className="cta-buttons">
            <button 
              className="btn btn--primary btn--lg"
              onClick={() => user ? null : onAuthAction('signup')}
            >
              Start Swapping
            </button>
            <button 
              className="btn btn--outline btn--lg"
              onClick={() => user ? null : onAuthAction('signin')}
            >
              Browse Items
            </button>
            <button 
              className="btn btn--secondary btn--lg"
              onClick={() => user ? null : onAuthAction('signin')}
            >
              List an Item
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Items Exchanged</span>
            </div>
            <div className="stat">
              <span className="stat-number">5,000+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat">
              <span className="stat-number">2M+</span>
              <span className="stat-label">Pounds of Waste Reduced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
