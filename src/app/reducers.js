import { combineReducers } from 'redux';
import userReducer from '../features/userSlice';
import bookReducer from '../features/bookSlice';
import reviewReducer from '../features/reviewSlice';
import sharedBookshelfReducer from '../features/sharedBookshelfSlice';

const rootReducer = combineReducers({
    user: userReducer,
    books: bookReducer,
    reviews: reviewReducer,
    sharedBookshelves: sharedBookshelfReducer
});

export default rootReducer;
