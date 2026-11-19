import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showStore, setShowStore] = useState(false);

  const handleGetStarted = () => {
    setShowStore(true);
  };

  return (
    <div className="App">
      {!showStore ? (
        <div className="landing-page">
          <div className="landing-overlay">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
            <AboutUs />
          </div>
        </div>
      ) : (
        <div className="store-page">
          <h2>Paradise Nursery - Plant Store</h2>
          <button onClick={() => setShowStore(false)}>Back to Home</button>
        </div>
      )}
    </div>
  );
}

export default App;
