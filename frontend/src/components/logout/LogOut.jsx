import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";

const Logout = () => {
    const [isLogOut, setLogOut] = useState(false);

    const handleLogout = () => {
        // Limpa o token do localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setLogOut(true);
    };

    if (isLogOut) {
        return <Navigate to="/login" replace />; // Redireciona para a rota raiz após login bem-sucedido
    }else{
        return (
            <button onClick={handleLogout}>
                LogOut
                <LuLogOut />
            </button>
        );
    }

    
};

export default Logout;
