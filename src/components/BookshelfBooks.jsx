import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksInBookshelf } from '../store/bookshelfSlice';
import BookCard from './BookCard';
import ManageAccessModal from './ManageAccessModal';

const BookshelfBooks = () => {
    const dispatch = useDispatch();
    const { selectedBookshelf, booksInSelectedBookshelf = [] } = useSelector((state) => state.bookshelves);
    const [showManageAccess, setShowManageAccess] = useState(false);

    useEffect(() => {
        if (selectedBookshelf) {
            dispatch(fetchBooksInBookshelf(selectedBookshelf.id));
        }
    }, [dispatch, selectedBookshelf]);

    const handleManageAccessClick = () => {
        setShowManageAccess(true);
    };

    return (
        <div className="bookshelf-books">
            {selectedBookshelf ? (
                <>
                    <h2>{selectedBookshelf.name}</h2>
                    {selectedBookshelf.owner && (
                        <button onClick={handleManageAccessClick}>Manage Access</button>
                    )}
                    <div className="book-grid">
                        {booksInSelectedBookshelf.length > 0 ? (
                            booksInSelectedBookshelf.map((book) => (
                                book && <BookCard key={book.id} book={book} />
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
                </>
            ) : (
                <p>Select a bookshelf to view its books.</p>
            )}
        </div>
    );
};

export default BookshelfBooks;
