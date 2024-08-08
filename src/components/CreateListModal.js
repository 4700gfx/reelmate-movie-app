import React, { useState } from 'react';

const CreateListModal = ({ isOpen, onClose, onCreate, onSearch, searchResults, onAddToList }) => {
  const [listName, setListName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleCreateList = () => {
    onCreate(listName);
  };

  if (!isOpen) return null; // Ensure modal is only rendered when open

  return (
    <div className='modal-overlay'>
      <div className='modal create-list-modal'>
        <button className='close-button' onClick={onClose}>X</button>
        <h2>Create a New List</h2>
        <input
          type='text'
          placeholder='List Name'
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button onClick={handleCreateList}>Create List</button>
        <h3>Search for Shows/Movies</h3>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <ul>
          {searchResults.map((item) => (
            <li key={item.id}>
              {item.name || item.title}
              <button onClick={() => onAddToList(item)}>Add to List</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateListModal;
