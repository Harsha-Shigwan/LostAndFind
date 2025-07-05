import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBullhorn, FaHandsHelping } from 'react-icons/fa';
import FoundItemForm from './FoundItemForm';

function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleReportClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div>
            <span className="logo">Find & Lost</span>
          </div>
          <div className="nav-buttons">
            <button 
              className="nav-button login-button" 
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              className="nav-button signup-button" 
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-container">
          <h1 className="hero-title">Find What You Lost, Return What You Found</h1>
          <p className="hero-subtitle">Connecting people with their lost items through our community platform</p>
          <div className="hero-buttons">
            <button 
              className="hero-button found-button" 
              onClick={handleReportClick}
            >
              Report Found Item
            </button>
            <button className="hero-button search-button" onClick={() => navigate('/searchLost')}>
              Search Lost Item
            </button>

            <button className="hero-button report-button" onClick={() => navigate('')}>
              Reports Registered
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="features-container">
          <h2 className="features-title">How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaSearch style={{color: '#3B82F6'}} />
              </div>
              <h3 className="feature-title">Search Items</h3>
              <p className="feature-description">Browse through our database of found items or search for specific lost items.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaBullhorn style={{color: '#F59E0B'}} />
              </div>
              <h3 className="feature-title">Report Items</h3>
              <p className="feature-description">Found something? Report it to help reunite it with its owner.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaHandsHelping style={{color: '#10B981'}} />
              </div>
              <h3 className="feature-title">Get Matched</h3>
              <p className="feature-description">Our system automatically matches lost and found items based on descriptions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div>
              <span className="footer-logo">Find & Lost</span>
              <p className="footer-text">Helping reunite people with their belongings since 2023</p>
            </div>
            <div className="footer-links">
              <button className="footer-link">About</button>
              <button className="footer-link">Contact</button>
              <button className="footer-link">Privacy</button>
              <button className="footer-link">Terms</button>
            </div>
          </div>
        </div>
      </footer>

      {showForm && (
        <div className="form-overlay">
          <FoundItemForm onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
