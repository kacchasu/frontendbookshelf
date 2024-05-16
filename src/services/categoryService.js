import axios from 'axios';
import api from './api';


const API_URL = '/categories';

const getAllCategories = async () => {
    const response = await api.get(API_URL);
    return response.data;
};

export default { getAllCategories };
