import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/userSlice';
import authService from '../services/authService';

function LoginRegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await authService.register({ username, password, email });
            }
            const response = await authService.login({ username, password });
            const token = response.data.token;
            localStorage.setItem('token', token); // Store the token in local storage
            dispatch(login({ username, token }));
            navigate('/all-books'); // Redirect to the all books page
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    };

    return (
        <div>
            <h1>Welcome!</h1>
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                )}
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">{isRegister ? 'Sign Up' : 'Log In'}</button>
            </form>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Already have an account? Log In' : 'New user? Sign Up'}
            </button>
        </div>
    );
}

export default LoginRegisterPage;
