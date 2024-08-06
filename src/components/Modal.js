// components/Modal.js
import React from 'react';


const Modal = ({ isOpen, onClose, results, onOptionSelect }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='close-button' onClick={onClose}>X</button>
        <h2>Search Results</h2>
        <ul className='results-list'>
          {results.map((result) => (
            <li key={result.id} className='result-item' onClick={() => onOptionSelect(result)}>
              {result.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} 
                  alt={result.title || result.name} 
                />
              ) : (
                <div className='no-image'>No Image</div>
              )}
              <div>{result.title || result.name}</div>
              <div>Type: {result.media_type}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
