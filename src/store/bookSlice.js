import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookService from '../services/bookService';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await bookService.getAllBooks();
    return response;
});

export const saveBook = createAsyncThunk('books/saveBook', async (bookData, { dispatch }) => {
    const response = await bookService.saveBook(bookData);
    dispatch(fetchBooks()); // Refetch books after saving
    return response;
});

const bookSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(saveBook.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books.push(action.payload);
            })
            .addCase(saveBook.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default bookSlice.reducer;
