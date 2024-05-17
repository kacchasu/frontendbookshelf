import { combineReducers } from 'redux';
import userReducer from './userSlice';
import bookReducer from './bookSlice';
import sharedBookshelfReducer from './sharedBookshelfSlice';
import categoryReducer from './categorySlice';
import bookshelfReducer from './bookshelfSlice';

const rootReducer = combineReducers({
    user: userReducer,
    books: bookReducer,
    sharedBookshelves: sharedBookshelfReducer,
    categories: categoryReducer, // Ensure categories reducer is included
    bookshelves: bookshelfReducer,
});

export default rootReducer;
