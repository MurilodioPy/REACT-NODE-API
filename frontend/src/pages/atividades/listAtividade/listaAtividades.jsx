import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './listatividade.module.css';
import DeleteAtividade from '../../../components/deleteatividade/deleteatividade'; // Importe o componente Deleteatividade aqui

export default function Listatividades() {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/atividades');
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
      await axios.delete(`http://127.0.0.1:8000/api/atividades/${id}`);
      setAtividades(atividades.filter(atividade => atividade.id !== id));
    } catch (error) {
      setError('Erro ao deletar atividade. Por favor, tente novamente mais tarde.');
      console.error('Erro ao deletar atividade:', error);
    }
  };

  if (loading) {
    return <p>Carregando atividades...</p>;
  }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <div className={styles.containerList}>
      <h1>Atividades</h1>
      <Link to="/add">Adicionar Atividade</Link>
      <ul>
        {atividades.map(atividade => (
          <li key={atividade.id}>
            {atividade.nome} - {atividade.data} - {atividade.local}
            <Link to={`/edit/${atividade.id}`}>Editar</Link>
            <DeleteAtividade id={atividade.id} onDelete={deleteAtividade} />
          </li>
        ))}
      </ul>
    </div>
  );
};


