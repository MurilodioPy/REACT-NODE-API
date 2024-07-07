import { Link, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from '../../../api/axiosConfig';
import styles from './login.module.css'
import ErrorComponente from '../../../components/error/ErrorComponente';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para indicar se o usuário está logado
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
            localStorage.setItem('userId', response.data.userId); // Armazena o token no localStorage
            setIsLoggedIn(true); // Atualiza o estado para indicar que o login foi bem-sucedido
        } catch (error) {
            setError("Erro ao fazer login!"); // Exibir o erro ao usuário
            console.error(error.response?.data || error.message);
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/" replace />; // Redireciona para a rota raiz após login bem-sucedido
    }

    if (error) {
        return <ErrorComponente error={error} />
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            
            <Link to='/newUser'>Registrar</Link>
            
        </div>
    );
};

export default Login;
