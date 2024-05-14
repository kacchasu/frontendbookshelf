import api from './api';

const fetchBooks = () => {
    return api.get('books');
};

const fetchBookById = (id) => {
    return api.get(`books/${id}`);
};

const addBook = (bookData) => {
    return api.post('books', bookData);
};

export default {
    fetchBooks,
    fetchBookById,
    addBook
};
