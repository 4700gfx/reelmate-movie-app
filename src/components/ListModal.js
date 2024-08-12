import React from 'react';

const ListModal = ({ isOpen, onClose, list, onDeleteItem, onCompleteItem, completedList }) => {
  if (!isOpen) return null;

  const isCompletedList = list?.name === 'Completed'; // Check if the list is "Completed"

  return (
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
                  <li>Type of Media: {item.media_type === "tv" ? "Television Show" : "Movie"}</li>
                  <li>First Episode Air Date: {item.first_air_date || item.release_date}</li>
                  <li>{item.popularity} Out of 100</li>
                  {item.watchCount && <li>Watch Count: {item.watchCount}</li>}
                  
                  {!isCompletedList && (
                    <>
                      <button onClick={() => onCompleteItem(list.name, item)}>Completed</button>
                      <button onClick={() => onDeleteItem(list.name, item.id)}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No items in this list</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListModal;
