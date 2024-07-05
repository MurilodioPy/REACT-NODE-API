import React, { useState, useEffect } from 'react';
import axios from '../../../api/axiosConfig.js';

const AddActivity = () => {
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const userId = localStorage.getItem('userId'); // Obtendo o usuário logado
    console.log("USERID:" + userId);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categoria/');
                setCategories(response.data);
            } catch (error) {
                console.error(error.response?.data || error.message);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/atividade/', {
                description,
                userId,
                categoryId: selectedCategory,
            });
            console.log(response.data);
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
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Selecione uma Categoria</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.description}
                    </option>
                ))}
            </select>
            <button type="submit">Adicionar Atividade</button>
        </form>
    );
};

export default AddActivity;
