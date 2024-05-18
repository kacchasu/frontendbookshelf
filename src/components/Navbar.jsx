import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector((state) => state.user.username); // Get the username from the Redux store
    console.log(username);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav>
            <div>
                <Link to="/all-books">All Books</Link>
                <Link to="/my-bookshelves">My Bookshelves</Link>
            </div>
            <div>
                <span>{username}</span> {/* Display the username */}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
