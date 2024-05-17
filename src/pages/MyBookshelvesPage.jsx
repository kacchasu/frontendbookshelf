import React from 'react';
import BookshelfSidebar from '../components/BookshelfSidebar';
import BookshelfBooks from '../components/BookshelfBooks';

const MyBookshelvesPage = () => {
    return (
        <div className="my-bookshelves-page">
            <BookshelfSidebar />
            <BookshelfBooks />
        </div>
    );
};

export default MyBookshelvesPage;
