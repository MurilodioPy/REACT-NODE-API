import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from '../../../api/axiosConfig.js';
// import UpdateUser from './UpdateUser';
import DeleteUser from '../../../components/deleteuser/deleteUser.jsx';
import styles from './profile.module.css';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const userId = localStorage.getItem('userId'); 
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/usuario/${userId}`);
                setUser(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error(error.response?.data || error.message);
            }
        };
        fetchUser();
    }, [userId]);

    const deleteUser = async (id) => {
        try {
          await axios.delete(`/usuario/${id}`);
          setUsuario({});
        } catch (error) {
          setError('Erro ao deletar usuário. Por favor, tente novamente mais tarde.');
          console.error('Erro ao deletar usuário:', error);
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.container}>
            <h2>Perfil do Usuário</h2>
            <div className={styles.profileInfo}>
                <p><strong>Nome:</strong> {user.name} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className={styles.buttons}>
                <button>
                    <Link to={`/editUsuario/${user.id}`}>Editar</Link>
                </button>
                <DeleteUser userId={userId} onDelete={deleteUser} />
            </div>
        </div>
    );
};

export default UserProfile;
