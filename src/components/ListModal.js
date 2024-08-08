import React from 'react';

const ListModal = ({ isOpen, onClose, list }) => {
  return (
    isOpen ? (
      <div className='modal-overlay'>
        <div className='modal list-modal'>
          <button className='close-button' onClick={onClose}>X</button>
          <h2>{list?.name || 'List'}</h2>
          <ul>
            {list?.items && list.items.length ? (
              list.items.map(item => (
                <div key={item.id} className='list-item'>
                  <img 
                    className='list-icon'
                    src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'path/to/default/image.jpg'} 
                    alt={item.name || item.title} 
                  />
                  <div className='list-details'>
                    <li>Show/Movie Name: {item.name || item.title}</li>
                    <li> Type of Media: {item.media_type === "tv" ? "Movie" : "Television Show"}</li>
                    <li> First Episode Air Date: {item.first_air_date || item.release_date}</li>
                    <li>{item.popularity} Out of 100</li>
                    <button>Completed</button>
                    <button>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in this list</p>
            )}
          </ul>
        </div>
      </div>
    ) : null
  );
};

export default ListModal;
