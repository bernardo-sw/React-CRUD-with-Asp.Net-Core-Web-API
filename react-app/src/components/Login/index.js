import React from 'react';
import './styles.css';
import loginImage from '../../assets/login.png';

export default function Login() {
    return (
        <div className="login-container">
            <section className="form">
                <img src={loginImage} alt="Login" id="login-image" />
                <form>
                    <h1>Login</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button className="button" type="submit">Enter</button>
                </form>
            </section>
        </div>
    );
}