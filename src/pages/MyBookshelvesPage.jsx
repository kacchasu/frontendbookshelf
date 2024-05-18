import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BookshelfSidebar from '../components/BookshelfSidebar';
import BookshelfBooks from '../components/BookshelfBooks';
import { clearSelectedBookshelf } from '../store/bookshelfSlice';

const MyBookshelvesPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearSelectedBookshelf());
    }, [dispatch]);

    return (
        <div className="my-bookshelves-page">
            <BookshelfSidebar />
            <BookshelfBooks />
        </div>
    );
};

export default MyBookshelvesPage;
