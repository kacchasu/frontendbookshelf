// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
        },
        logoutSuccess: (state) => {
            state.user = null;
        },
    },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
