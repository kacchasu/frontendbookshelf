import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/all-books">All Books</Link>
            <Link to="/my-reviews">My Reviews</Link>
            <Link to="/my-bookshelves">My Bookshelves</Link>
            <button>Logout</button>
        </nav>
    );
}

export default Navbar;
