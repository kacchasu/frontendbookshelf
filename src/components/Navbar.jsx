import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { currentUser } = useAuth();

    return (
        <nav>
            {currentUser ? (
                <>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <button onClick={currentUser.logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};
