// src/features/bookSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
    name: 'books',
    initialState: {
        list: [],
        status: 'idle',
    },
    reducers: {
        setBooks: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { setBooks } = bookSlice.actions;

export default bookSlice.reducer;
