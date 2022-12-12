import React, { useState } from 'react';
import { useFireContext } from '../firebase/context/context';
import './css/login.css';

export default function Registro() {
    const {SignUp} = useFireContext();
    
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',   
        confirmPassword: ''
    });

    const handleInput = (event) => {
        const { id, value } = event.target;
        setUserInfo({ ...userInfo, [id]: value });
    };

    const handleSubmit = event =>{
        event.preventDefault();
    };

    const Register = async () => {
        try {
            if (userInfo.password !== userInfo.confirmPassword) { alert("No coinciden las contraseñas"); return };
            // Create a new account 
            await SignUp(
                userInfo.email,
                userInfo.password,
                userInfo.name
            );
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="login-page">
            <div className="form">
                <h2>Registro</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="name" id='name' onChange={handleInput} />
                    <input type="text" placeholder="email address" id='email' onChange={handleInput} />
                    <input type="password" placeholder="password" id='password' onChange={handleInput} />
                    <input type="password" placeholder="confirm password" id='confirmPassword' onChange={handleInput} />
                    <button onClick={() => Register()} type="submit">Sign up</button>
                    <p className="message">Already registered? <a href="/login">Sign In</a></p>
                </form>
            </div>
        </div>
    )
}
