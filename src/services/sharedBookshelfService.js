import api from './api';

const API_URL = '/shared-bookshelves';

const getAllSharedBookshelves = async () => {
    const response = await api.get(API_URL);
    return response.data;
};

const getSharedBookshelfById = async (id) => {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
};

const saveSharedBookshelf = async (sharedBookshelf) => {
    const response = await api.post(API_URL, sharedBookshelf);
    return response.data;
};

export default { getAllSharedBookshelves, getSharedBookshelfById, saveSharedBookshelf };
