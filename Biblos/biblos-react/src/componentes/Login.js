import React from 'react';
import './css/login.css';

export default function Login() {
    return (
        <div className="login-page">
            <div className="form">
                <h2>Inicio de sesion</h2>
                <form className="login-form">
                    <input type="text" placeholder="username" />
                    <input type="password" placeholder="password" />
                    <button>login</button>
                    <p className="message">Not registered? <a href="/signup">Create an account</a></p>
                </form>
            </div>
        </div>
    )
}
