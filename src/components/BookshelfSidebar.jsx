import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookshelves, createBookshelf, selectBookshelf, clearSelectedBookshelf } from '../store/bookshelfSlice';

const BookshelfSidebar = () => {
    const dispatch = useDispatch();
    const { myBookshelves, sharedBookshelves, selectedBookshelf } = useSelector((state) => state.bookshelves);
    const [newBookshelfName, setNewBookshelfName] = useState('');

    useEffect(() => {
        const userId = 1; // Replace with actual user ID
        dispatch(fetchBookshelves(userId));
    }, [dispatch]);

    const handleSelectBookshelf = (bookshelf) => {
        dispatch(selectBookshelf(bookshelf));
    };

    const handleCreateBookshelf = () => {
        if (newBookshelfName.trim() !== '') {
            dispatch(createBookshelf({ name: newBookshelfName }));
            setNewBookshelfName('');
        }
    };

    const handleClearSelectedBookshelf = () => {
        dispatch(clearSelectedBookshelf());
    };

    return (
        <div className="bookshelf-sidebar">
            <div>
                <h2>My Bookshelves</h2>
                {myBookshelves.map((bookshelf) => (
                    <div key={bookshelf.id} onClick={() => handleSelectBookshelf(bookshelf)}>
                        {bookshelf.name}
                    </div>
                ))}
                <input
                    type="text"
                    value={newBookshelfName}
                    onChange={(e) => setNewBookshelfName(e.target.value)}
                    placeholder="New Bookshelf Name"
                />
                <button onClick={handleCreateBookshelf}>Create Bookshelf</button>
            </div>
            <div>
                <h2>Shared Bookshelves</h2>
                {sharedBookshelves.map((bookshelf) => (
                    <div key={bookshelf.id} onClick={() => handleSelectBookshelf(bookshelf)}>
                        {bookshelf.name}
                    </div>
                ))}
            </div>
            {selectedBookshelf && (
                <div>
                    <button onClick={handleClearSelectedBookshelf}>Close Selected Bookshelf</button>
                </div>
            )}
        </div>
    );
};

export default BookshelfSidebar;
