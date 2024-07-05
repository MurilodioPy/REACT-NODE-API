import React from 'react';
import { Navigate } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";

const Logout = () => {

    const handleLogout = () => {
        // Limpa o token do localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        // Redireciona para a página de login
        <Navigate to="/login"/>;
    };

    return (
        <a onClick={handleLogout}>
            <LuLogOut />
        </a>
    );
};

export default Logout;
