// components/ActorMoviesModal.js
import React, { useState, useEffect } from 'react';


const ActorMoviesModal = ({ isOpen, onClose, actorId, onMovieClick }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (actorId) {
      fetchActorMovies(actorId);
    }
  }, [actorId]);

  const fetchActorMovies = async (actorId) => {
    const API_KEY = '57e7da297e7cfe3c1ceff135422b6c96'; 
    const response = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`);
    const data = await response.json();
    setMovies(data.cast);
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='close-button' onClick={onClose}>X</button>
        <h2>Actor's Movies</h2>
        <ul className='results-list'>
          {movies.map((movie) => (
            <li 
              key={movie.id} 
              className='result-item' 
              onClick={() => onMovieClick(movie.id)}
            >
              {movie.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                  alt={movie.title} 
                />
              ) : (
                <div className='no-image'>No Image</div>
              )}
              <div>{movie.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActorMoviesModal;
