import React, { useState } from 'react';

const ConfirmAddModal = ({ isOpen, onClose, lists, onConfirm, item, onAddToList}) => {
  const [selectedList, setSelectedList] = useState('');

  const handleConfirm = () => {
    onConfirm(item, selectedList); // Add item to the selected list
    onAddToList(item); // Perform any additional actions
    onClose(); // Close the modal after confirming
  };




  return (
    isOpen && (
      <div className='modal-overlay'>
        <div className='modal confirmation-modal'>
          <button className='close-button' onClick={onClose}>X</button>
          <h2>Select List</h2>
          <select className='list-console' onChange={(e) => setSelectedList(e.target.value)} value={selectedList}>
            <option value='' disabled>Select a list</option>
            {lists.map(list => (
              <option key={list.name} value={list.name}>{list.name}</option>
            ))}
          </select>
          <button className='list-button' onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    )
  );
};

export default ConfirmAddModal;
