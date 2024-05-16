import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSharedBookshelves } from '../store/sharedBookshelfSlice';

function MyBookshelvesPage() {
    const dispatch = useDispatch();
    const sharedBookshelves = useSelector((state) => state.sharedBookshelves);

    useEffect(() => {
        dispatch(fetchSharedBookshelves());
    }, [dispatch]);

    return (
        <div>
            <h1>My Bookshelves</h1>
            <div className="bookshelf-list">
                {sharedBookshelves.map((shelf) => (
                    <div key={shelf.id} className="bookshelf-item">
                        <h3>{shelf.name}</h3>
                        <p>Owner: {shelf.owner.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyBookshelvesPage;
