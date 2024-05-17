import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginRegisterPage from './pages/LoginRegisterPage';
import AllBooksPage from './pages/AllBooksPage';
import MyBookshelvesPage from './pages/MyBookshelvesPage';
import Navbar from './components/Navbar';

function App() {
    const token = useSelector((state) => state.user.token);

    return (
        <div className="App">
            {token && <Navbar />} {/* Only show Navbar if token exists */}
            <Routes>
                <Route path="/login" element={<LoginRegisterPage />} />
                <Route path="/register" element={<LoginRegisterPage />} />
                {token ? (
                    <>
                        <Route path="/all-books" element={<AllBooksPage />} />
                        <Route path="/my-bookshelves" element={<MyBookshelvesPage />} />
                        <Route path="*" element={<Navigate to="/all-books" />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </div>
    );
}

export default App;
