import { createSlice } from '@reduxjs/toolkit';
import reviewService from '../services/reviewService';

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: [],
    reducers: {
        setReviews(state, action) {
            return action.payload;
        },
    },
});

export const { setReviews } = reviewSlice.actions;

export const fetchReviews = (bookId) => async (dispatch) => {
    const reviews = await reviewService.getReviewsByBookId(bookId);
    dispatch(setReviews(reviews));
};

export default reviewSlice.reducer;
