import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../api/axiosConfig.js';
import styles from './update.module.css';
import ErrorComponente from '../../../components/error/ErrorComponente.jsx';

export default function UpdateUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [usuario, setUsuario] = useState({
        name: '',
        lastName: '',
        email: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/usuario/${id}`);
                setUsuario(response.data);
            } catch (error) {
                console.error('Erro ao buscar o usuário:', error);
                setError('Erro ao carregar o usuário. Por favor, tente novamente mais tarde.');
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/usuario/${id}`, usuario);
            console.log('Usuário atualizado com sucesso:', response.data);
            navigate('/profile');
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
            setError('Erro ao atualizar o usuário. Por favor, tente novamente mais tarde.');
        }
    };

    if (error) {
       return <ErrorComponente error={error} />
    }

    return (
        <div className={styles.container}>

        <form onSubmit={handleSubmit} className={styles.updateForm}>
            <h2>Atualizar Perfil</h2>
            <div className='labelContainer'>
                <label>Nome</label>
                <input
                    type="text"
                    placeholder="Nome"
                    name='name'
                    value={usuario.name}
                    onChange={handleChange}
                    />
            </div>
            <div className='labelContainer'>
                <label>Sobrenome</label>
                <input
                    type="text"
                    placeholder="Sobrenome"
                    name='lastName'
                    value={usuario.lastName}
                    onChange={handleChange}
                    />
            </div>
            <div className='labelContainer'>
                <label>Email</label>
                <input
                    type="text"
                    placeholder="Email"
                    name='email'
                    value={usuario.email}
                    onChange={handleChange}
                    />
            </div>
            <button type="submit">Atualizar</button>
        </form>
        </div>
    );
};
