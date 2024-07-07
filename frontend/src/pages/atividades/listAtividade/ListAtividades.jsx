import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './listatividade.module.css';
import DeleteAtividade from '../../../components/deleteatividade/deleteAtividade';
import axios from '../../../api/axiosConfig.js';
import { MdModeEdit } from "react-icons/md";

export default function Listatividades() {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await axios.get(`/atividade/all/${userId}`);
        setAtividades(response.data);
      } catch (error) {
        setError('Erro ao carregar atividades. Por favor, tente novamente mais tarde.');
        console.error('Erro ao carregar atividades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAtividades();
  }, []);

  const deleteAtividade = async (id) => {
    try {
      await axios.delete(`/atividade/${id}`);
      setAtividades(atividades.filter(atividade => atividade.id !== id));
    } catch (error) {
      setError('Erro ao deletar atividade. Por favor, tente novamente mais tarde.');
      console.error('Erro ao deletar atividade:', error);
    }
  };

  if (loading) {
    return <p>Carregando atividades...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.containerList}>
      <h2>Atividades</h2>
      
      <Link to="/addAtividade">Adicionar Atividade</Link>
      
      <ul>
      {Array.isArray(atividades) ? (
        atividades.map(atividade => (
          <li key={atividade.id}>
            {atividade.description}
            <div className={styles.buttons}>
              <DeleteAtividade id={atividade.id} onDelete={deleteAtividade} />
              <Link to={`/editAtividade/${atividade.id}`}><MdModeEdit/></Link>
            </div>
          </li>
        ))
      ) : (
        <p>Sem atividades</p>
      )}
      </ul>
    </div>
  );
};


