import React, { useState } from 'react';
import axios from '../../../api/axiosConfig.js';
import styles from './addcategoria.module.css';

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
        <div className={styles.container}>
            <h2>Adicionar Categoria</h2>
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
                    <button type="submit">Adicionar Categoria</button>
            </form>
        </div>
    );
};

export default AddCategory;
