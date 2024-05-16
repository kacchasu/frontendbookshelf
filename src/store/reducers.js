import { combineReducers } from 'redux';
import userReducer from './userSlice';
import bookReducer from './bookSlice';
import reviewReducer from './reviewSlice';
import sharedBookshelfReducer from './sharedBookshelfSlice';
import categoryReducer from './categorySlice';

const rootReducer = combineReducers({
    user: userReducer,
    books: bookReducer,
    reviews: reviewReducer,
    sharedBookshelves: sharedBookshelfReducer,
    categories: categoryReducer, // Ensure categories reducer is included
});

export default rootReducer;
