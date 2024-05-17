import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookshelfService from '../services/bookshelfService';

export const fetchBookshelves = createAsyncThunk('bookshelves/fetchBookshelves', async () => {
    const response = await bookshelfService.getBookshelves();
    return response;
});

export const fetchBooksInBookshelf = createAsyncThunk('bookshelves/fetchBooksInBookshelf', async (bookshelfId) => {
    const response = await bookshelfService.getBooksInBookshelf(bookshelfId);
    return response;
});

export const createBookshelf = createAsyncThunk('bookshelves/createBookshelf', async (bookshelfData) => {
    const response = await bookshelfService.createBookshelf(bookshelfData);
    return response;
});

const initialState = {
    myBookshelves: [],
    sharedBookshelves: [],
    selectedBookshelf: null,
    booksInSelectedBookshelf: [],
    isLoading: false,
    error: null,
};

const bookshelfSlice = createSlice({
    name: 'bookshelves',
    initialState,
    reducers: {
        selectBookshelf(state, action) {
            state.selectedBookshelf = action.payload;
        },
        clearSelectedBookshelf(state) {
            state.selectedBookshelf = null;
            state.booksInSelectedBookshelf = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookshelves.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBookshelves.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myBookshelves = action.payload.filter(bookshelf => bookshelf.userBookshelves.length > 0);
                state.sharedBookshelves = action.payload.filter(bookshelf => bookshelf.userBookshelves.length === 0);
            })
            .addCase(fetchBookshelves.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchBooksInBookshelf.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBooksInBookshelf.fulfilled, (state, action) => {
                state.isLoading = false;
                state.booksInSelectedBookshelf = action.payload;
            })
            .addCase(fetchBooksInBookshelf.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(createBookshelf.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBookshelf.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myBookshelves.push(action.payload);
            })
            .addCase(createBookshelf.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { selectBookshelf, clearSelectedBookshelf } = bookshelfSlice.actions;

export default bookshelfSlice.reducer;
