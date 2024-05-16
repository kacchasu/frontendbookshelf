import { createSlice } from '@reduxjs/toolkit';
import bookService from '../services/bookService';

const bookSlice = createSlice({
    name: 'books',
    initialState: [],
    reducers: {
        setBooks(state, action) {
            return action.payload;
        },
    },
});

export const { setBooks } = bookSlice.actions;

export const fetchBooks = () => async (dispatch) => {
    const books = await bookService.getAllBooks();
    dispatch(setBooks(books));
};

export default bookSlice.reducer;
