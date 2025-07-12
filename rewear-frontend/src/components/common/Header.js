import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onAuthAction }) => {
  const { user, logout } = useAuth();

  return (
    <header className="main-header" style={{
      background: '#fff',
      boxShadow: '0 2px 8px rgba(40,167,69,0.06)',
      padding: '0.7rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div className="logo" style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#28a745'
        }}>
          <span role="img" aria-label="ReWear">♻️</span>
          <span style={{ marginLeft: '0.5rem' }}>ReWear</span>
        </div>
        
        <div className="header-actions" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {user ? (
            <>
              <span style={{ color: '#28a745', marginRight: '0.5rem' }}>
                Hi, {user.name}
              </span>
              <button className="btn btn--outline" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn--outline" 
                onClick={() => onAuthAction('signin')}
              >
                Sign In
              </button>
              <button 
                className="btn btn--primary" 
                onClick={() => onAuthAction('signup')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
