// components/MovieDetailsModal.js
import React, { useState, useEffect } from 'react';


const MovieDetailsModal = ({ isOpen, onClose, movieId }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(movieId);
    }
  }, [movieId]);

  const fetchMovieDetails = async (movieId) => {
    const API_KEY = '57e7da297e7cfe3c1ceff135422b6c96'; // Replace with your actual TMDB API key
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    setMovieDetails(data);
    console.log(data);
  };




  if (!isOpen) return null;

  return (
    <div className='modal-overlay' id='movie-modal'>
      <div className='modal movie-modal-container'>
        <button className='close-button' onClick={onClose}>X</button>
        {movieDetails ? (
          <>
            <div className='movie-header'>
            <h2>{movieDetails.title}</h2>
            <img 
              className='movie-image'
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} 
              alt={movieDetails.title} 
            />
            <button> Add To List </button>
            <button> Watch Now</button>
            </div>
            <p className='move-details'>{movieDetails.overview}</p>
            <ul className='additional-details'>
              <li>{movieDetails.popularity + " " + "Out of 10"}</li>
              <li>{movieDetails.runtime + " " + "Mintues"}</li>
              <li>{movieDetails.status = "Released" ? "Out In Theathers" : "Coming Soon"}</li>
            </ul>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsModal;
