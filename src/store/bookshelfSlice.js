import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookshelfService from '../services/bookshelfService';
import userService from '../services/authService';

export const fetchBookshelves = createAsyncThunk('bookshelves/fetchBookshelves', async (_, { getState }) => {
    const { user } = getState();
    const userInfo = await userService.getUserByUsername(user.username);
    const response = await bookshelfService.getBookshelvesByUsername(userInfo.data.id);
    return response.map(item => ({
        ...item.sharedBookshelf,
        owner: item.owner
    }));
});

export const fetchBooksInBookshelf = createAsyncThunk('bookshelves/fetchBooksInBookshelf', async (bookshelfId) => {
    const response = await bookshelfService.getBooksInBookshelf(bookshelfId);
    return response;
});

export const createBookshelf = createAsyncThunk('bookshelves/createBookshelf', async (bookshelfData) => {
    const response = await bookshelfService.createBookshelf(bookshelfData);
    return response;
});

export const inviteUserToBookshelf = createAsyncThunk('bookshelves/inviteUserToBookshelf', async ({ bookshelfId, username }) => {
    const response = await bookshelfService.inviteUserToBookshelf(bookshelfId, username);
    return response;
});

export const removeUserFromBookshelf = createAsyncThunk('bookshelves/removeUserFromBookshelf', async ({ bookshelfId, username }) => {
    const response = await bookshelfService.removeUserFromBookshelf(bookshelfId, username);
    return response;
});

export const addBookToBookshelf = createAsyncThunk('bookshelves/addBookToBookshelf', async ({ bookshelfId, bookId }) => {
    const response = await bookshelfService.addBookToBookshelf(bookshelfId, bookId);
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
                const myBookshelves = [];
                const sharedBookshelves = [];
                action.payload.forEach(bookshelf => {
                    if (bookshelf.owner) {
                        myBookshelves.push(bookshelf);
                    } else {
                        sharedBookshelves.push(bookshelf);
                    }
                });
                state.myBookshelves = myBookshelves;
                state.sharedBookshelves = sharedBookshelves;
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
                state.myBookshelves.push({ ...action.payload, owner: true });
            })
            .addCase(createBookshelf.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(inviteUserToBookshelf.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(inviteUserToBookshelf.fulfilled, (state, action) => {
                state.isLoading = false;
                // Handle successful invite
            })
            .addCase(inviteUserToBookshelf.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(removeUserFromBookshelf.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeUserFromBookshelf.fulfilled, (state, action) => {
                state.isLoading = false;
                // Handle successful removal
            })
            .addCase(removeUserFromBookshelf.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addBookToBookshelf.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addBookToBookshelf.fulfilled, (state, action) => {
                state.isLoading = false;
                // Handle successful book addition
            })
            .addCase(addBookToBookshelf.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { selectBookshelf, clearSelectedBookshelf } = bookshelfSlice.actions;

export default bookshelfSlice.reducer;
