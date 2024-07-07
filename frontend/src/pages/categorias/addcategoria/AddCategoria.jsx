import React, { useState } from 'react';
import axios from '../../../api/axiosConfig.js';
import styles from './addcategoria.module.css';
import { useNavigate } from 'react-router-dom';
import ErrorComponente from '../../../components/error/ErrorComponente.jsx';

const AddCategory = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/categoria/', { description });
            navigate("/categorias");
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    if (error) {
        return  <ErrorComponente error={error} />
    }

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
