import React from 'react';
import axios from '../api/axios';
import styles from './deleteuser.module.css';

const DeleteUser = ({ userId, onDelete }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/users/${userId}`);
            onDelete();
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <button onClick={handleDelete} className={styles.deleteButton}>
            Excluir Conta
        </button>
    );
};

export default DeleteUser;
