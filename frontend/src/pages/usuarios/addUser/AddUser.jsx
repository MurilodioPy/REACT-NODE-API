import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../../api/axiosConfig";
import styles from "./adduser.module.css";

const Register = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/auth/register", {
                name,
                lastName,
                email,
                password,
            });
            console.log(response.data); // Exibir a resposta do backend
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

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
            <button>
                <Link to='/login'>Login</Link>
            </button>
        </div>
    );
};

export default Register;
