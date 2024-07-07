import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../api/axiosConfig.js';
import styles from './editatividade.module.css';
import ErrorComponente from '../../../components/error/ErrorComponente.jsx';

export default function EditAtividades(){
    const { id } = useParams();
    const [atividade, setAtividade] = useState({
        description: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAtividade = async () => {
            try {
                const response = await axios.get(`/atividade/${id}`);
                setAtividade(response.data);
            } catch (error) {
                console.error('Erro ao buscar a atividade:', error);
                setError('Erro ao carregar o atividade. Por favor, tente novamente mais tarde.');
            }
        };

        fetchAtividade();
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
            setError('Erro ao atualizar a atividade. Por favor, tente novamente mais tarde.');
        }
    };

    if (error) {
        return <ErrorComponente error={error} />
    }

    return (
        <div className={styles.editContainer}>
            <h2>Editar Atividade</h2>
            <form onSubmit={handleSubmit}>
                <div className='labelContainer'>
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


