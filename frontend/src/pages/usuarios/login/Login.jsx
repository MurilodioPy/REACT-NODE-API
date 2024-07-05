import { Link, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from '../../../api/axiosConfig';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
            
            <Navigate to="/login" />; // Redireciona para a rota raiz após login bem-sucedido
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <>
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
        </>
    );
};

export default Login;
