import api from './api';

const API_URL = '/shared-bookshelves';

const getBookshelves = async () => {
    const response = await api.get(API_URL);
    return response.data;
};

const getBooksInBookshelf = async (bookshelfId) => {
    const response = await api.get(`${API_URL}/${bookshelfId}/books`);
    return response.data;
};

const createBookshelf = async (bookshelfData) => {
    const response = await api.post(API_URL, bookshelfData);
    return response.data;
};

export default { getBookshelves, getBooksInBookshelf, createBookshelf };
