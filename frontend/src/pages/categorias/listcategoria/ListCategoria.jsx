import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import DeleteCategory from './DeleteCategory';
import styles from './listcategoria.module.css';

const ListCategories = () => {
    const [categories, setCategories] = useState([]);

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

    const deleteCategory = (id) => {
        setCategories(categories.filter(category => category.id !== id));
    };

    return (
        <div className={styles.containerList}>
            <h1>Categorias</h1>
            <Link to="/addCategory">Adicionar Categoria</Link>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {category.description}
                        <Link to={`/editCategoria/${category.id}`}>Editar</Link>
                        <DeleteCategory id={category.id} onDelete={deleteCategory} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListCategories;
