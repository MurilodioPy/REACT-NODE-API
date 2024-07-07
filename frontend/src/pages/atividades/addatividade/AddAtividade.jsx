import React, { useState, useEffect } from 'react';
import axios from '../../../api/axiosConfig.js';
import styles from './addatividade.module.css'

const AddActivity = () => {
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const userId = localStorage.getItem('userId'); // Obtendo o usuário logado


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
                userId: parseInt(userId),
                categoryId: parseInt(selectedCategory),
            });
            console.log(response.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Adicionar Atividade</h2>

    
                <form onSubmit={handleSubmit}>
                    <div className='labelContainer'>
                        <label>Descrição</label>
                        <input
                            type="text"
                            placeholder="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='labelContainer'>
                        <label>Categoria</label>
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
                    </div>
                    <button type="submit">Adicionar Atividade</button>
                </form>
        </div>
    );
};

export default AddActivity;
