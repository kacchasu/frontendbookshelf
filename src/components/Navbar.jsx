import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav>
            <Link to="/all-books">All Books</Link>
            <Link to="/my-bookshelves">My Bookshelves</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;
