const API_URL = 'https://art-gallery-backend-sia7.onrender.com';

export const fetchArtworks = async () => {
  const response = await fetch(`${API_URL}/artworks`);
  return await response.json();
};

export const fetchArtwork = async (id) => {
  const response = await fetch(`${API_URL}/artworks/${id}`);
  return await response.json();
};

export const fetchArtistProfile = async (id) => {
  const response = await fetch(`${API_URL}/artists/${id}`);
  return await response.json();
};
