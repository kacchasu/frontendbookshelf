import api from './api';

const fetchSharedBookshelves = () => {
    return api.get('shared-bookshelves');
};

const fetchSharedBookshelfById = (id) => {
    return api.get(`shared-bookshelves/${id}`);
};

const createSharedBookshelf = (bookshelfData) => {
    return api.post('shared-bookshelves', bookshelfData);
};

const updateSharedBookshelf = (id, bookshelfData) => {
    return api.put(`shared-bookshelves/${id}`, bookshelfData);
};

const deleteSharedBookshelf = (id) => {
    return api.delete(`shared-bookshelves/${id}`);
};

const addBookToSharedBookshelf = (shelfId, bookId) => {
    return api.post(`shared-bookshelves/${shelfId}/books`, { bookId });
};

const removeBookFromSharedBookshelf = (shelfId, bookId) => {
    return api.delete(`shared-bookshelves/${shelfId}/books/${bookId}`);
};

export default {
    fetchSharedBookshelves,
    fetchSharedBookshelfById,
    createSharedBookshelf,
    updateSharedBookshelf,
    deleteSharedBookshelf,
    addBookToSharedBookshelf,
    removeBookFromSharedBookshelf
};
