import React from 'react';

const DeleteUser = ({ id , onDelete }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={() => onDelete(id)}>Excluir</button>
            </div>
        </div>
    );
};

export default DeleteUser;
