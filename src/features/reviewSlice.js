// src/features/reviewSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        list: [],
        status: 'idle',
    },
    reducers: {
        addReview: (state, action) => {
            state.list.push(action.payload);
        },
    },
});

export const { addReview } = reviewSlice.actions;

export default reviewSlice.reducer;
