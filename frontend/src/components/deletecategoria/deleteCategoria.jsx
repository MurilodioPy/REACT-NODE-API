import React from 'react';
import axios from '../../api/axiosConfig.js';

const DeleteCategory = ({ id, onDelete }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/categoria/${id}`);
            onDelete(id);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <button onClick={handleDelete}>Excluir</button>
    );
};

export default DeleteCategory;
