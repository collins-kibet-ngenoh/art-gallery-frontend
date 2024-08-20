import React, { useState } from 'react';
import '../styles/HomePage.css'; // Import your CSS file for styling

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="homepage">
     
      <div className="container">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
          <button
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabChange('register')}
          >
            Register
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'login' && (
            <div className="login-form">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email address" required />
                <input type="password" placeholder="Password" required />
                <button className="btn" type="submit">Sign In</button>
                <p>
                  Not a member?{' '}
                  <a href="#" onClick={() => handleTabChange('register')}>Register</a>
                </p>
              </form>
            </div>
          )}
          {activeTab === 'register' && (
            <div className="register-form">
              <h2>Register</h2>
              <form onSubmit={handleRegister}>
                <input type="text" placeholder="Name" required />
                <input type="text" placeholder="Username" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button className="btn" type="submit">Sign Up</button>
                <p>
                  Already a member?{' '}
                  <a href="#" onClick={() => handleTabChange('login')}>Login</a>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
