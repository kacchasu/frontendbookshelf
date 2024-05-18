import api from './api';

const API_URL = '/shared-bookshelves';

const getBookshelves = async () => {
    const response = await api.get(API_URL);
    return response.data;
};

const getBooksInBookshelf = async (bookshelfId) => {
    const response = await api.get(`/shared-bookshelf-books/shared-bookshelves/${bookshelfId}`);
    return response.data.map(bc => bc.book);
};

const createBookshelf = async (bookshelfData) => {
    const response = await api.post(API_URL, bookshelfData);
    return response.data;
};

const inviteUserToBookshelf = async (bookshelfId, username) => {
    const response = await api.post(`${API_URL}/${bookshelfId}/invite?inviteeUsername=${username}`);
    return response.data;
};

const removeUserFromBookshelf = async (bookshelfId, username) => {
    const response = await api.delete(`${API_URL}/${bookshelfId}/remove?username=${username}`);
    return response.data;
};

const getBookshelvesByUsername = async (username) => {
    const response = await api.get(`/user-bookshelf/${username}`);
    return response.data;
};

const addBookToBookshelf = async (bookshelfId, bookId) => {
    const response = await api.post(`/shared-bookshelf-books`, {
        sharedBookshelf: { id: bookshelfId },
        book: { id: bookId }
    });
    return response.data;
};

export default { getBookshelves, getBooksInBookshelf, createBookshelf, inviteUserToBookshelf, removeUserFromBookshelf, getBookshelvesByUsername, addBookToBookshelf };
