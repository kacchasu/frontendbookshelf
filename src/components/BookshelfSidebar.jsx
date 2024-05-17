import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookshelves, fetchBooksInBookshelf, selectBookshelf, createBookshelf } from '../store/bookshelfSlice';

const BookshelfSidebar = () => {
    const dispatch = useDispatch();
    const { myBookshelves = [], sharedBookshelves = [], selectedBookshelf } = useSelector((state) => state.bookshelves);
    const [showMyBookshelves, setShowMyBookshelves] = useState(true);
    const [showSharedBookshelves, setShowSharedBookshelves] = useState(true);
    const [newBookshelfName, setNewBookshelfName] = useState('');

    useEffect(() => {
        dispatch(fetchBookshelves());
    }, [dispatch]);

    const handleBookshelfClick = (bookshelf) => {
        dispatch(selectBookshelf(bookshelf));
        dispatch(fetchBooksInBookshelf(bookshelf.id));
    };

    const handleCreateBookshelf = () => {
        if (newBookshelfName.trim()) {
            dispatch(createBookshelf({ name: newBookshelfName }));
            setNewBookshelfName('');
        }
    };

    return (
        <div className="bookshelf-sidebar">
            <div>
                <h3 onClick={() => setShowMyBookshelves(!showMyBookshelves)}>My Bookshelves</h3>
                {showMyBookshelves && (
                    <ul>
                        {myBookshelves.map((bookshelf) => (
                            <li
                                key={bookshelf.id}
                                className={selectedBookshelf?.id === bookshelf.id ? 'selected' : ''}
                                onClick={() => handleBookshelfClick(bookshelf)}
                            >
                                {bookshelf.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <h3 onClick={() => setShowSharedBookshelves(!showSharedBookshelves)}>Shared Bookshelves</h3>
                {showSharedBookshelves && (
                    <ul>
                        {sharedBookshelves.map((bookshelf) => (
                            <li
                                key={bookshelf.id}
                                className={selectedBookshelf?.id === bookshelf.id ? 'selected' : ''}
                                onClick={() => handleBookshelfClick(bookshelf)}
                            >
                                {bookshelf.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <h3>Create New Bookshelf</h3>
                <input
                    type="text"
                    value={newBookshelfName}
                    onChange={(e) => setNewBookshelfName(e.target.value)}
                    placeholder="New bookshelf name"
                />
                <button onClick={handleCreateBookshelf}>Create</button>
            </div>
        </div>
    );
};

export default BookshelfSidebar;
