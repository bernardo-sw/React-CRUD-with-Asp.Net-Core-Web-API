import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import loginImage from '../../assets/login.png';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        const data = { email, password };
        try {
            const response = await api.post('api/account/loginuser', data);

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            navigate('/students');
        } catch (err) {
            alert('Login failed: ' + err.message);
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={loginImage} alt="Login" id="login-image" />
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="button" type="submit">Enter</button>
                </form>
            </section>
        </div>
    );
}