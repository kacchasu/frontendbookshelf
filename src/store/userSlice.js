import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/authService';

const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, token: null },
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;

export const login = (credentials) => async (dispatch) => {
    const userData = await authService.login(credentials);
    dispatch(setUser(userData));
};

export default userSlice.reducer;
