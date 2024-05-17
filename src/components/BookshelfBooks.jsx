import React from 'react';
import { useSelector } from 'react-redux';
import BookCard from './BookCard';
import ManageAccessModal from './ManageAccessModal';

const BookshelfBooks = () => {
    const { selectedBookshelf, booksInSelectedBookshelf = [] } = useSelector((state) => state.bookshelves);
    const [showManageAccess, setShowManageAccess] = React.useState(false);

    const handleManageAccessClick = () => {
        setShowManageAccess(true);
    };

    return (
        <div className="bookshelf-books">
            <h2>{selectedBookshelf?.name}</h2>
            {selectedBookshelf?.owner && (
                <button onClick={handleManageAccessClick}>Manage Access</button>
            )}
            <div className="book-grid">
                {booksInSelectedBookshelf.length > 0 ? (
                    booksInSelectedBookshelf.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </div>
            {showManageAccess && (
                <ManageAccessModal
                    bookshelf={selectedBookshelf}
                    onClose={() => setShowManageAccess(false)}
                />
            )}
        </div>
    );
};

export default BookshelfBooks;
