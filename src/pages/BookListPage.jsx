import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import BookService from '../services/BookService';

const BookListPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        BookService.fetchBooks()
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-3 gap-4">
                {books.map(book => <BookCard key={book.id} book={book} />)}
            </div>
        </div>
    );
};

export default BookListPage;

