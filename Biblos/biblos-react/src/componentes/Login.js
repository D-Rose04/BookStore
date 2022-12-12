import React, { useState } from 'react';
import { useFireContext } from '../firebase/context/context';
import './css/login.css';

export default function Login() {
    const { SignIn } = useFireContext();

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });

    const handleInput = (event) => {
        const { id, value } = event.target;
        setUserInfo({ ...userInfo, [id]: value });
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        console.log(userInfo)
        await SignIn(userInfo.email, userInfo.password);
    }

    return (
        <div className="login-page">
            <div className="form">
                <h2>Inicio de sesion</h2>
                <form className="login-form">
                    <input type="email" placeholder="email address" id='email' onChange={handleInput} />
                    <input type="password" placeholder="password" id='password' onChange={handleInput} />
                    <button type='submit' onClick={handleSignIn}>login</button>
                    <p className="message">Not registered? <a href="/signup">Create an account</a></p>
                </form>
            </div>
        </div>
    )
}
