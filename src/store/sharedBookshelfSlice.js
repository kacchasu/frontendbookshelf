import { createSlice } from '@reduxjs/toolkit';
import sharedBookshelfService from '../services/sharedBookshelfService';

const sharedBookshelfSlice = createSlice({
    name: 'sharedBookshelves',
    initialState: [],
    reducers: {
        setSharedBookshelves(state, action) {
            return action.payload;
        },
    },
});

export const { setSharedBookshelves } = sharedBookshelfSlice.actions;

export const fetchSharedBookshelves = () => async (dispatch) => {
    const sharedBookshelves = await sharedBookshelfService.getAllSharedBookshelves();
    dispatch(setSharedBookshelves(sharedBookshelves));
};

export default sharedBookshelfSlice.reducer;
