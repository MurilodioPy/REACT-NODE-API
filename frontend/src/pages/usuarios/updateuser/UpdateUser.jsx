import React, { useState } from 'react';
import axios from '../api/axios';
import styles from './update.module.css';

const UpdateUser = ({ user, setUser }) => {
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/usuario/${user.id}`, { firstName, lastName });
            setUser(response.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.updateForm}>
            <h2>Atualizar Perfil</h2>
            <input
                type="text"
                placeholder="Nome"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Sobrenome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <button type="submit">Atualizar</button>
        </form>
    );
};

export default UpdateUser;
