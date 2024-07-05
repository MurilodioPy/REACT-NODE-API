import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import styles from './profile.module.css';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // Assumindo que o ID do usuário está salvo no localStorage após o login

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/usuario/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error(error.response?.data || error.message);
            }
        };

        fetchUser();
    }, [userId]);

    const handleDelete = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <div className={styles.container}>
            <h1>Perfil do Usuário</h1>
            <div className={styles.profileInfo}>
                <p><strong>Nome:</strong> {user.firstName} {user.lastName}</p>
            </div>
            <UpdateUser user={user} setUser={setUser} />
            <DeleteUser userId={userId} onDelete={handleDelete} />
        </div>
    );
};

export default UserProfile;
