import React from 'react';
import HeroSection from './HeroSection';
import FeaturedItems from './FeaturedItems';
import '../../styles/LandingPage.css';

const LandingPage = ({ onAuthAction }) => {
  return (
    <div className="landing-page">
      <HeroSection onAuthAction={onAuthAction} />
      <FeaturedItems />
      
      <section className="sustainability-section">
        <div className="container">
          <div className="sustainability-content">
            <h2>Why Choose ReWear?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🌱</div>
                <h3>Reduce Waste</h3>
                <p>Help reduce textile waste by giving clothes a second life</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h3>Save Money</h3>
                <p>Get new clothes without spending money through our point system</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🤝</div>
                <h3>Build Community</h3>
                <p>Connect with like-minded people who care about sustainability</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">✨</div>
                <h3>Discover Unique Items</h3>
                <p>Find unique pieces you won't see in regular stores</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
