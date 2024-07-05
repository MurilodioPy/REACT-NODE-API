import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../api/axiosConfig';
import styles from './editeventos.module.css';

export default function EditEventos(){
    const { id } = useParams();
    const history = useNavigate();
    const [evento, setEvento] = useState({
        nome_evento: '',
        data: '',
        local: '',
        descricao: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const response = await axios.get(`/eventos/${id}`);
                setEvento(response.data);
            } catch (error) {
                console.error('Erro ao buscar o evento:', error);
                setError('Erro ao carregar o evento. Por favor, tente novamente mais tarde.');
            }
        };

        fetchEvento();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvento({ ...evento, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/eventos/${id}`, evento);
            console.log('Evento atualizado com sucesso:', response.data);
            history.push('/eventos');
        } catch (error) {
            console.error('Erro ao atualizar o evento:', error);
            setError('Erro ao atualizar o evento. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <div className={styles.editContainer}>
            <h1>Edit Event</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Name:</label>
                    <input
                        type="text"
                        name="nome_evento"
                        value={evento.nome_evento}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="data"
                        value={evento.data}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="local"
                        value={evento.local}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="descricao"
                        value={evento.descricao}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Update Event</button>
            </form>
        </div>
    );
};


