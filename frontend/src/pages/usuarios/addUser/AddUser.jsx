import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../../api/axiosConfig";
import styles from "./adduser.module.css";
import ErrorComponente from "../../../components/error/ErrorComponente";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/auth/register", {
                name,
                lastName,
                email,
                password,
            });

            console.log(response.data); 
            navigate("/login");
        } catch (error) {
            setError("Erro ao inserir usuário! Usuário já existe!"); // Exibir o erro ao usuário
            console.error(error.response?.data || error.message);
        }
    };

    if (error) {
        return  <ErrorComponente error={error} />
    }

    return (
        <div className={styles.container}>
            <h2>Registrar</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
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
                <button type="submit">Registrar</button>
            </form>
            
            <Link to='/login'>Login</Link>
            
        </div>
    );
};

export default Register;
