import api from './api';

const API_URL = '/books';
const CATEGORY_URL = '/book-categories/books';

const getAllBooks = async () => {
    const booksResponse = await api.get(API_URL);
    const books = booksResponse.data;

    const booksWithCategories = await Promise.all(
        books.map(async (book) => {
            const categoriesResponse = await api.get(`${CATEGORY_URL}/${book.id}`);
            const categories = categoriesResponse.data.map(bc => bc.category);
            return { ...book, categories };
        })
    );

    return booksWithCategories;
};

const getBookById = async (id) => {
    const bookResponse = await api.get(`${API_URL}/${id}`);
    const categoriesResponse = await api.get(`${CATEGORY_URL}/${id}`);
    const categories = categoriesResponse.data.map(bc => bc.category);
    return { ...bookResponse.data, categories };
};

const saveBook = async (book) => {
    const response = await api.post(API_URL, book);
    const categoriesResponse = await api.get(`${CATEGORY_URL}/${response.data.id}`);
    const categories = categoriesResponse.data.map(bc => bc.category);
    return { ...response.data, categories };
};

export default { getAllBooks, getBookById, saveBook };
