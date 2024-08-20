import React from 'react';
import '../styles/ArtworkCard.css';

const ArtworkCard = ({ artwork, onClick, onDelete }) => {
  return (
    <div className="artwork-card" onClick={onClick}>
      <img src={artwork.image_url} alt={artwork.title} className="artwork-image" />
      <div className="artwork-details">
        <h5 className="artwork-title">{artwork.title}</h5>
        <p className="artwork-description">{artwork.description}</p>
        <div className="artwork-meta">
          <span className="artwork-price">Ksh {artwork.price}</span>
          <span className="artwork-likes">Likes: {artwork.like_count}</span>
          <span className="artwork-comments">Comments: {artwork.comment_count}</span>
        </div>
        <div className="artwork-actions">
          <a href="#" className="artwork-link">View More</a>
          {onDelete && (
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the card click event
                onDelete(artwork.id);
              }}
            >
              <span role="img" aria-label="Delete">🗑️</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
