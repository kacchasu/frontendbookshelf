// src/features/sharedBookshelfSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const sharedBookshelfSlice = createSlice({
    name: 'sharedBookshelves',
    initialState: {
        list: [],
        status: 'idle',
    },
    reducers: {
        setSharedBookshelves: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { setSharedBookshelves } = sharedBookshelfSlice.actions;

export default sharedBookshelfSlice.reducer;
