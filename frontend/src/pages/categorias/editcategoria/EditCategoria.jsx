import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../api/axiosConfig';

export default function EditCategory() {
    const { id } = useParams();
    const [categoria, setCategoria] = useState({
        description: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const response = await axios.get(`/categoria/${id}`);
                setCategoria(response.data);
            } catch (error) {
                console.error('Erro ao buscar a categoria:', error);
                setError('Erro ao carregar o categoria. Por favor, tente novamente mais tarde.');
            }
        };
        fetchCategoria();
    }, [id]);

    const handleChange = (e) => {
        setCategoria({ ...categoria, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/categoria/${id}`, categoria);
            console.log('Categoria atualizada com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao atualizar o atividade:', error);
            setError('Erro ao atualizar a categoria. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <div>
            <h1>Editar Categoria</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Descrição da categoria:</label>
                <input
                    type="text"
                    name="description"
                    value={categoria.description}
                    onChange={handleChange}
                    required
                    />
                </div>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
};
