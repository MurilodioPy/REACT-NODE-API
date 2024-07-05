import React from 'react';

const DeleteAtividade = ({ atividade, onDelete, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirma</h2>
        <p>Você gostaria de deletar: "{atividade.nome}"?</p>
        <button onClick={() => onDelete(atividade.id)}>Sim, Delete</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteAtividade;
