import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ArtworksPage from './pages/ArtworksPage';
import ArtistProfilePage from './pages/ArtistProfilePage';
import ArtworkDetailsPage from './components/ArtworkDetailsPage';
import Navbar from './components/Navbar'; // Adjust path as needed

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Place Navbar outside of Routes to ensure it appears on all pages */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artworks" element={<ArtworksPage />} />
        <Route path="/artworks/:id" element={<ArtworkDetailsPage />} />
        <Route path="/artist/:id" element={<ArtistProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
