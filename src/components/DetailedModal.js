// components/DetailedModal.js
import React from 'react';


const DetailedModal = ({ isOpen, onClose, results, onActorClick, onMovieClick, onShowClick }) => {
  if (!isOpen) return null;

  const handleClick = (result) => {
    switch (result.media_type) {
      case 'person':
        onActorClick(result.id);
        break;
      case 'movie':
        onMovieClick(result.id);
        break;
      case 'tv':
        onShowClick(result.id);
        break;
      default:
        break;
    }
  };

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='close-button' onClick={onClose}>X</button>
        <h2>Filter Results</h2>
        <ul className='results-list'>
          {results.map((result) => (
            <li 
              key={result.id} 
              className='result-item' 
              onClick={() => handleClick(result)}
            >
              <div className='result-list-container'>
                {result.poster_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} 
                    alt={result.title || result.name} 
                    className='result-image'
                  />
                ) : (
                  <div className='no-image'>No Image</div>
                )}
                <div className='result-text'>
                  <div className='result-title'>{result.title || result.name}</div>
                  <button className='add-to-list-button'>Add To List +</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailedModal;
