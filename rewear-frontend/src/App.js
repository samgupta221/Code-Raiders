import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/common/Header';
import LandingPage from './components/landing/LandingPage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';

function AppContent() {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState(null); // 'signin' or 'signup'

  const handleAuthSuccess = () => {
    setAuthMode(null);
  };

  const handleAuthAction = (mode) => {
    setAuthMode(mode);
  };

  return (
    <div className="App">
      <Header onAuthAction={handleAuthAction} />
      
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              authMode === 'signin' ? (
                <SignIn 
                  onSuccess={handleAuthSuccess}
                  onSwitchToSignUp={() => setAuthMode('signup')}
                />
              ) : authMode === 'signup' ? (
                <SignUp 
                  onSuccess={handleAuthSuccess}
                  onSwitchToSignIn={() => setAuthMode('signin')}
                />
              ) : (
                <LandingPage onAuthAction={handleAuthAction} />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
