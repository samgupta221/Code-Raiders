import React from 'react';

const Loading = ({ message = "Loading..." }) => (
  <div className="loading-container" style={{
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '30vh'
  }}>
    <div className="spinner" style={{
      width: '40px', 
      height: '40px', 
      border: '5px solid #e0e0e0', 
      borderTop: '5px solid #28a745',
      borderRadius: '50%', 
      animation: 'spin 1s linear infinite', 
      marginRight: '16px'
    }} />
    <span style={{ fontSize: '1.2rem', color: '#444' }}>{message}</span>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `}</style>
  </div>
);

export default Loading;
