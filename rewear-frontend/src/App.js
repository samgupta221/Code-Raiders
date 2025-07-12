import React, { useState } from 'react';
import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

function App() {
  const [showSignIn, setShowSignIn] = useState(true);

  const handleSwitch = () => setShowSignIn((prev) => !prev);

  return (
    <div className="App">
      {showSignIn ? (
        <SignIn onSwitchToSignUp={handleSwitch} />
      ) : (
        <SignUp onSwitchToSignIn={handleSwitch} />
      )}
    </div>
  );
}

export default App;
