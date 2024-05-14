import api from './api';

const login = (username, password) => {
    return api.post('/users/login', { username, password });
};

const register = (username, passwordHash, email) => {
    return api.post('/users/register', { username, passwordHash, email });
};

const validateToken = (token) => {
    return api.post('/users/validateToken', { token });
};

const logout = () => {
    localStorage.removeItem('token');
    // You may need to handle backend logout too if necessary
};

export default {
    login,
    register,
    validateToken,
    logout,
};
