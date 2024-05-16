import api from './api';

const API_URL = '/';

const getAllCategories = async () => {
    const response = await api.get(`${API_URL}categories`);
    return response.data;
};

const getBooksByCategoryId = async (categoryId) => {
    const response = await api.get(`${API_URL}book-categories/categories/${categoryId}`);
    return response.data.map(bc => bc.book);
};

const getCategoriesByBookId = async (bookId) => {
    const response = await api.get(`${API_URL}book-categories/books/${bookId}`);
    return response.data;
};

export default { getAllCategories, getBooksByCategoryId, getCategoriesByBookId };
