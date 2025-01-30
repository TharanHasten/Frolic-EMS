import React from 'react';
import { useNavigate } from 'react-router-dom';

const FlashPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setTimeout(() => {
      navigate('/login'); 
    }, 500); // Adds a slight delay before navigating
  };

  return (
    <div className="flash-page">
      <div className="welcome-message">
        <h1>Welcome to Our Event Management System!</h1>
        <p>Don't miss your valuable events that make you memorable. Personalize and manage your events easily!</p>
        <button 
          className="get-started-btn" 
          onClick={handleGetStarted} 
          aria-label="Go to login page to get started"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default FlashPage;
