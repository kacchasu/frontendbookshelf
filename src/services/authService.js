import api from './api';

const authService = {
    login: (credentials) => {
        return api.post('/users/login', credentials);
    },
    register: (data) => {
        return api.post('/users/register', data);
    },
};

export default authService;
