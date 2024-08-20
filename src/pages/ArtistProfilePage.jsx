import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArtworkCard from '../components/ArtworkCard';
import '../styles/ArtistProfilePage.css';

const ArtistProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [newArt, setNewArt] = useState({ title: '', description: '', price: '', image_url: '' });
  const [error, setError] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchArtistProfile = async () => {
      try {
        const response = await axios.get(`https://art-gallery-backend-sia7.onrender.com/artist/${id}`);
        setArtist(response.data);

        // Check if the user is following this artist
        const followResponse = await axios.get(`https://art-gallery-backend-sia7.onrender.com/follow/check/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setIsFollowing(followResponse.data.isFollowing);
      } catch (err) {
        console.error('Error fetching artist profile:', err);
      }
    };

    fetchArtistProfile();
  }, [id]);

  const handlePostArt = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://art-gallery-backend-sia7.onrender.com/artwork', newArt, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log("Artwork posted successfully:", response.data);
      setArtist((prevArtist) => ({
        ...prevArtist,
        artworks: [...prevArtist.artworks, response.data.artwork],
      }));
      setNewArt({ title: '', description: '', price: '', image_url: '' });
      setError('');
    } catch (err) {
      console.error("Error posting artwork:", err);
      setError('Failed to post artwork. Please try again.');
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        // Unfollow artist if already following
        await axios.post('https://art-gallery-backend-sia7.onrender.com/follow', { followed_id: id }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setIsFollowing(false);
        setArtist((prevArtist) => ({
          ...prevArtist,
          follower_count: prevArtist.follower_count - 1,
        }));
      } else {
        // Follow artist if not following
        await axios.post('https://art-gallery-backend-sia7.onrender.com/follow', { followed_id: id }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setIsFollowing(true);
        setArtist((prevArtist) => ({
          ...prevArtist,
          follower_count: prevArtist.follower_count + 1,
        }));
      }
    } catch (err) {
      console.error('Error following/unfollowing artist:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="artist-profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-pic">
            <img src={artist.profile_pic_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnRERwoxRwPgzUFbZRRdDkM_3tjtWZeK3MBw&s'} alt="Profile" />
          </div>
          <div className="profile-details">
            <h1>{artist.username}</h1>
            <p>{artist.follower_count} Followers | {artist.following_count} Following</p>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <button 
              onClick={handleFollow} 
              className={`follow-button ${isFollowing ? 'following' : ''}`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
      </div>
      <div className="artworks-grid">
        {artist.artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
      <div className="post-art-form">
        <h2>Post New Art</h2>
        <form onSubmit={handlePostArt}>
          <input
            type="text"
            placeholder="Title"
            value={newArt.title}
            onChange={(e) => setNewArt({ ...newArt, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newArt.description}
            onChange={(e) => setNewArt({ ...newArt, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newArt.price}
            onChange={(e) => setNewArt({ ...newArt, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newArt.image_url}
            onChange={(e) => setNewArt({ ...newArt, image_url: e.target.value })}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn">Post Art</button>
        </form>
      </div>
    </div>
  );
};

export default ArtistProfilePage;
