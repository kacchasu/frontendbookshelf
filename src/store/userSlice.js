import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
        logout(state) {
            state.username = null;
            state.token = null;
            localStorage.removeItem('token'); // Clear the token from local storage
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
