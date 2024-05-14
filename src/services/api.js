import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
api.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 403) {
        alert('You are not authorized to view this content.');
        // Optionally redirect to a different page
    }
    return Promise.reject(error);
});

export default api;