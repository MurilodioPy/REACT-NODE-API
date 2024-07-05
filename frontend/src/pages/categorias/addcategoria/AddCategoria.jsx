import React, { useState } from 'react';
import axios from '../../../api/axiosConfig.js';

const AddCategory = () => {
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/categoria/', { description });
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
            <button type="submit">Adicionar Categoria</button>
        </form>
    );
};

export default AddCategory;
