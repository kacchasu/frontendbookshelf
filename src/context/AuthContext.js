import React, { createContext, useContext, useState, useEffect } from 'react';
import UserService from '../services/UserService';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            UserService.validateToken(token).then(() => {
                // Assume the token is valid if no error was thrown
                setCurrentUser({ token });
            }).catch(() => {
                localStorage.removeItem('token');
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = (username, password) => {
        return UserService.login(username, password).then(response => {
            const { token, roles } = response.data;
            localStorage.setItem('token', token);
            setCurrentUser({ username, token, roles });
        });
    };


    const register = (username, password, email) => {
        return UserService.register(username, password, email).then(response => {
            localStorage.setItem('token', response.data.token);
            setCurrentUser({ username, token: response.data.token });
        });
    };

    const logout = () => {
        UserService.logout();
        setCurrentUser(null);
        localStorage.removeItem('token');
    };

    const value = { currentUser, login, register, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
