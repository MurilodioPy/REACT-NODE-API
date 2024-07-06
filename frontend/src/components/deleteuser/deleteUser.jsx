import React from 'react';

const DeleteUser = ({ userId, onDelete }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={() => onDelete(userId)}>Excluir Conta</button>
            </div>
        </div>
    );
};

export default DeleteUser;
