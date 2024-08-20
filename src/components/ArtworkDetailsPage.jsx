import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ArtworkDetailsPage.css';

const ArtworkDetailsPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(`https://art-gallery-backend-sia7.onrender.com/artwork/${id}`);
        console.log('Fetched artwork data:', response.data); // Debugging line
        setArtwork(response.data);
      } catch (error) {
        console.error('Error fetching artwork details:', error);
      }
    };
    fetchArtwork();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.post(`https://art-gallery-backend-sia7.onrender.com/artwork/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const response = await axios.get(`https://art-gallery-backend-sia7.onrender.com/artwork/${id}`);
      setArtwork(response.data);
    } catch (error) {
      console.error('Error liking artwork:', error);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return; // Avoid posting empty comments
    try {
      await axios.post(`https://art-gallery-backend-sia7.onrender.com/artwork/${id}/comment`, { content: comment }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const response = await axios.get(`https://art-gallery-backend-sia7.onrender.com/artwork/${id}`);
      setArtwork(response.data);
      setComment('');
    } catch (error) {
      console.error('Error commenting on artwork:', error);
    }
  };

  const handleViewArtist = () => {
    if (artwork.artist && artwork.artist.id) {
      console.log('Navigating to artist ID:', artwork.artist.id); // Debugging line
      navigate(`/artist/${artwork.artist.id}`);
    } else {
      console.error('Artist ID is undefined');
    }
  };

  if (!artwork) {
    return <div>Loading...</div>;
  }

  return (
    <div className="artwork-details-page">
      <div className="artwork-header">
        <img src={artwork.image_url} alt={artwork.title} className="artwork-image" />
        <div className="artwork-info">
          <h1 className="artwork-title">{artwork.title}</h1>
          <p className="artwork-description">{artwork.description}</p>
          <p className="artwork-price">Ksh {artwork.price}</p>
          <p className="artwork-meta">
            Likes: {artwork.like_count} | Comments: {artwork.comment_count}
          </p>
          <div className="artwork-artist">
            <span>Artist: {artwork.artist ? artwork.artist.username : 'Unknown'}</span>
            <button onClick={handleViewArtist} className="view-artist-button" disabled={!artwork.artist?.id}>
              View Artist
            </button>
          </div>
          <button onClick={handleLike} className="like-button">Like</button>
          <div className="comment-section">
            <textarea 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              placeholder="Add a comment..." 
            />
            <button onClick={handleComment} className="comment-button">Comment</button>
          </div>
        </div>
      </div>
      <div className="comments-list">
        {artwork.comments && artwork.comments.map(comment => (
          <div key={comment.id} className="comment-item">
            <p><strong>User {comment.user_id}:</strong> {comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworkDetailsPage;
