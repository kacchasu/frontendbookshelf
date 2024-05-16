import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginRegisterPage from './pages/LoginRegisterPage';
import AllBooksPage from './pages/AllBooksPage';
import MyBookshelvesPage from './pages/MyBookshelvesPage';
import MyReviewsPage from './pages/MyReviewsPage';
import Navbar from './components/Navbar';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<LoginRegisterPage />} />
                <Route path="/all-books" element={<AllBooksPage />} />
                <Route path="/my-bookshelves" element={<MyBookshelvesPage />} />
                <Route path="/my-reviews" element={<MyReviewsPage />} />
            </Routes>
        </div>
    );
}

export default App;
