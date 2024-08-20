import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      const response = await axios.post('https://art-gallery-backend-sia7.onrender.com/login', { email, password });
  
      if (response.status === 200) {
        const { token, id } = response.data;
  
        // Check if token and id are received correctly
        if (!token) {
          console.error('Token is missing in response data:', response.data);
          setError('Login failed: Token missing in server response.');
          return;
        }
  
        // Store token and id in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', id || '');  // Store user_id or an empty string
  
        // Redirect to /profile/user_id on successful login
        navigate('/artworks')
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <p>Not a member? <a href="#" onClick={() => navigate('/register')}>Register</a></p>
    </div>
  );
};

export default Login;
