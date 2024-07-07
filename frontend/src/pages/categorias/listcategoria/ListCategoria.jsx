import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../api/axiosConfig.js';
import DeleteCategory from '../../../components/deletecategoria/deleteCategoria.jsx';
import styles from './listcategoria.module.css';

const ListCategories = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/categoria');
                setCategorias(response.data);
            } catch (error) {
                console.error(error.response?.data || error.message);
            }
        };

        fetchCategories();
    }, []);

    const deleteCategoria = async (id) => {
        try {
            await axios.delete(`/categoria/${id}`);
            setAtividades(categorias.filter(categoria => categoria.id !== id));
        } catch (error) {
            setError('Erro ao deletar categoria. Por favor, tente novamente mais tarde.');
            console.error('Erro ao deletar categoria:', error);
        }
    };

    return (
        <div className={styles.containerList}>
            <div className={styles.containerTitle}>
                <h2>Categorias</h2>
                <button>
                    <Link to="/addCategoria">Adicionar Categoria</Link>
                </button>
            </div>
            <ul>
                {categorias.map(category => (
                    <li key={category.id}>
                        {category.description}
                        <div className={styles.buttons}>
                            <button>
                                <Link to={`/editCategoria/${category.id}`}>Editar</Link>
                            </button>
                            <DeleteCategory id={category.id} onDelete={deleteCategoria} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListCategories;
