import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BookService from '../services/BookService';

const DashboardPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        BookService.fetchBooks()
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => console.log('Error fetching books:', error));
    }, []);

    return (
        <div>
            <Navbar />
            <h1>Dashboard</h1>
            <div className="grid grid-cols-3 gap-4">
                {books.map(book => (
                    <div key={book.id}>{book.title}</div>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
