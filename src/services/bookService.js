import api from './api';

const API_URL = '/books';

const getAllBooks = async () => {
    const response = await api.get(API_URL);
    return response.data;
};

const getBookById = async (id) => {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
};

const saveBook = async (book) => {
    const response = await api.post(API_URL, book);
    return response.data;
};

export default { getAllBooks, getBookById, saveBook };
