import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../api/axiosConfig';

const EditCategory = () => {
    const { id } = useParams();
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`/categories/${id}`);
                setDescription(response.data.description);
            } catch (error) {
                console.error(error.response?.data || error.message);
            }
        };
        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/categories/edit/${id}`, { description });
            navigate('/');
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Atualizar Categoria</button>
        </form>
    );
};

export default EditCategory;
