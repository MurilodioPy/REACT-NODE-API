import React from 'react';

const DeleteAtividade = ({ id, onDelete }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteAtividade;
