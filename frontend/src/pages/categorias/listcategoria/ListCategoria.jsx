import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../api/axiosConfig.js';
import Delete from '../../../components/delete/Delete.jsx';
import styles from './listcategoria.module.css';
import { MdModeEdit } from "react-icons/md";
import ErrorComponente from '../../../components/error/ErrorComponente.jsx';

const ListCategories = () => {
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`/categoria`);
                setCategorias(response.data);
            } catch (error) {
                setError('Erro ao carregar categorias. Por favor, tente novamente mais tarde.');
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

    if (error) {
        return  <ErrorComponente error={error} />
    }
    
    
    return (
        <div className={styles.containerList}>
            <div className={styles.containerTitle}>
                <h2>Categorias</h2>
                
                <Link to="/addCategoria">Adicionar Categoria</Link>
                
            </div>
            <ul>
                {categorias.map(categoria => (
                    <li key={categoria.id}>
                        {categoria.description}
                        <div className={styles.buttons}>
                            <Delete id={categoria.id} onDelete={deleteCategoria} />
                            <Link to={`/editCategoria/${categoria.id}`}>
                                <MdModeEdit />
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListCategories;
