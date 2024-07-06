import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../api/axiosConfig.js';
import styles from './editatividade.module.css';

export default function EditAtividades(){
    const { id } = useParams();
    const [atividade, setAtividade] = useState({
        description: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const response = await axios.get(`/atividade/${id}`);
                setAtividade(response.data);
            } catch (error) {
                console.error('Erro ao buscar o atividade:', error);
                setError('Erro ao carregar o atividade. Por favor, tente novamente mais tarde.');
            }
        };

        fetchEvento();
    }, [id]);

    const handleChange = (e) => {
        setAtividade({ ...atividade, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/atividade/${id}`, atividade);
            console.log('Atividade atualizada com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao atualizar o atividade:', error);
            setError('Erro ao atualizar o atividade. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <div className={styles.editContainer}>
            <h1>Editar Atividade</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Descrição da atividade:</label>
                    <input
                        type="text"
                        name="description"
                        value={atividade.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
};


