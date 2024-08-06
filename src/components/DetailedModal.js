// components/DetailedModal.js
import React from 'react';


const DetailedModal = ({ isOpen, onClose, results, onActorClick, onMovieClick }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='close-button' onClick={onClose}>X</button>
        <h2>Detailed Results</h2>
        <ul className='results-list'>
          {results.map((result) => (
            <li 
              key={result.id} 
              className='result-item' 
              onClick={() => result.media_type === 'person' ? onActorClick(result.id) : onMovieClick(result.id)}
            >
              {result.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} 
                  alt={result.title || result.name} 
                />
              ) : (
                <div className='no-image'>No Image</div>
              )}
              <div>{result.title || result.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailedModal;
