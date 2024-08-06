// components/ShowDetailsModal.js
import React, { useState, useEffect } from 'react';


const ShowDetailsModal = ({ isOpen, onClose, showId }) => {
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    if (showId) {
      fetchShowDetails(showId);
    }
  }, [showId]);

  const fetchShowDetails = async (showId) => {
    const API_KEY = '57e7da297e7cfe3c1ceff135422b6c96'; 
    const response = await fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}`);
    const data = await response.json();
    setShowDetails(data);
  };

  if (!isOpen || !showDetails) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='close-button' onClick={onClose}>X</button>
        <h2>{showDetails.name}</h2>
        {showDetails.poster_path ? (
          <img 
            src={`https://image.tmdb.org/t/p/w200${showDetails.poster_path}`} 
            alt={showDetails.name} 
          />
        ) : (
          <div className='no-image'>No Image</div>
        )}
        <p>{showDetails.overview}</p>
        <ul className='additional-details'>
            <li>{showDetails.popularity}</li>
            <li>{showDetails.runtime}</li>
           <li>{showDetails.status = "Released" ? "Airing Now" : "Coming Soon"}</li>
        </ul>
      </div>
    </div>
  );
};

export default ShowDetailsModal;
