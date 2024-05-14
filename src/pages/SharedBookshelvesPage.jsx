import React, { useEffect, useState } from 'react';
import SharedBookshelfService from '../services/SharedBookshelfService';

const SharedBookshelvesPage = () => {
    const [bookshelves, setBookshelves] = useState([]);

    useEffect(() => {
        SharedBookshelfService.fetchSharedBookshelves()
            .then(response => {
                setBookshelves(response.data);
            })
            .catch(error => console.error('Failed to fetch shared bookshelves:', error));
    }, []);

    return (
        <div>
            <h1>Shared Bookshelves</h1>
            {bookshelves.map(shelf => (
                <div key={shelf.id}>{shelf.name}</div>
            ))}
        </div>
    );
};

export default SharedBookshelvesPage;
