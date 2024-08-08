// ConfirmAddModal.js
// ConfirmAddModal.js
import React, { useState } from 'react'; // Add useState import

const ConfirmAddModal = ({ isOpen, onClose, lists, onConfirm, item }) => {
  const [selectedList, setSelectedList] = useState('');

  const handleConfirm = () => {
    onConfirm(item, selectedList);
  };

  return (
    isOpen && (
      <div className='modal-overlay'>
        <div className='modal'>
          <button className='close-button' onClick={onClose}>X</button>
          <h2>Select List</h2>
          <select onChange={(e) => setSelectedList(e.target.value)} value={selectedList}>
            <option value='' disabled>Select a list</option>
            {lists.map(list => (
              <option key={list.name} value={list.name}>{list.name}</option>
            ))}
          </select>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    )
  );
};

export default ConfirmAddModal;
