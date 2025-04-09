import React from 'react';
import { auth, provider } from '../utils/Firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 👈
import './login.css';
import Header from '../Header/Header';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth(); // 👈

    const googleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const user = response.user;
            const userData = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL,
                phoneNumber: user.phoneNumber
            };

            const apiResponse = await fetch(import.meta.env.VITE_API_URL + '/auth/google-login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const result = await apiResponse.json();
            if (result.success) {
                setUser(result.user); // 👈 update context
                navigate('/dashboard');
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    return (
        <div className="login-container">
            <Header />
            <h1 className="login-title">Google Login Integration</h1>
            <button className="google-button" onClick={googleLogin}>Sign In With Google</button>
        </div>
    );
};

export default Login;
