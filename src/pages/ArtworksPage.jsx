import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtworkCard from '../components/ArtworkCard';
import '../styles/ArtworksPage.css';

const ArtworksPage = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('https://art-gallery-backend-sia7.onrender.com/artworks');
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };
    fetchArtworks();
  }, []);

  return (
    <div className="artworks-page">
      <h1>Artworks</h1>
      <div className="artworks-grid">
        {artworks.map(artwork => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onClick={() => window.location.href = `/artworks/${artwork.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtworksPage;
